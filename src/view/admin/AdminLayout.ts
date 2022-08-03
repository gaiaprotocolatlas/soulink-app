import { constants } from "ethers";
import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Loading from "../../components/Loading";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import Bio from "../../datamodel/Bio";
import Wallet from "../../network/Wallet";
import Alert from "../../popup/Alert";

export default class AdminLayout extends View {

    public static current: AdminLayout;
    public content: DomNode;

    private container: DomNode;

    public address = constants.AddressZero;

    private prevBio: Bio = { links: [] };
    public bio: Bio = { links: [] };

    private currentLink: DomNode | undefined;
    private links: { [name: string]: DomNode } = {};
    private saveButton: DomNode;

    constructor(params: ViewParams, uri: string) {
        super();
        AdminLayout.current = this;

        BodyNode.append(this.container = el(".admin-layout",
            el("header",
                el(".menu",
                    this.links["links"] = el("a", "Links", { click: () => { SkyRouter.go("/admin", undefined, true) } }),
                    //this.links["appearance"] = el("a", "Appearance", { click: () => { SkyRouter.go("/admin/appearance", undefined, true) } }),
                    //this.links["requests"] = el("a", "Requests", { click: () => { SkyRouter.go("/admin/requests", undefined, true) } }),
                ),
                this.saveButton = el("a.save", "Save", { click: () => this.save() }),
            ),
            this.content = el("main"),
            el("footer",
                new ResponsiveImage("img", "/images/bottom-logo.png"),
                el(".sns",
                    el("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }),
                    el("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" }),
                ),
            ),
        ));

        document.title = "Soulink Admin";
        this.highlight(uri);
    }

    public async ready(proc: () => Promise<void>) {
        const loading = new Loading("Loading...").appendTo(BodyNode);
        if (this.address !== constants.AddressZero) {
            await proc();
        } else {

            let address = await Wallet.loadAddress();
            if (address === undefined) {
                await Wallet.connect();
                address = await Wallet.loadAddress();
            }

            if (address === undefined) {
                this.content.empty().append(el("p", "Not connected to wallet."));
            } else {
                const balance = await SoulinkContract.balanceOf(address);
                if (balance.eq(0)) {
                    SkyRouter.go("/mint", undefined, true);
                } else {
                    const result = await fetch(`${Config.apiURI}/bio/${address}`);
                    const str = await result.text();
                    this.bio = str === "" ? { links: [] } : JSON.parse(str);
                    this.prevBio = JSON.parse(JSON.stringify(this.bio));
                    this.address = address;
                    await proc();
                }
            }
        }
        loading.delete();
    }

    private async save() {
        const signedMessage = await Wallet.signMessage("Save your changes.");
        await fetch(`${Config.apiURI}/bio`, {
            method: "POST",
            body: JSON.stringify({ signedMessage, bio: this.bio }),
        });
        this.prevBio = JSON.parse(JSON.stringify(this.bio));
        this.checkChanges();
        new Alert("Changes Saved!");
    }

    public checkChanges() {
        if (JSON.stringify(this.prevBio) !== JSON.stringify(this.bio)) {
            this.saveButton.addClass("on");
        } else {
            this.saveButton.deleteClass("on");
        }
    }

    private highlight(uri: string) {
        this.currentLink?.deleteClass("on");
        if (uri === "admin") {
            this.currentLink = this.links["links"];
        } else {
            this.currentLink = this.links[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentLink?.addClass("on");
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.highlight(uri);
    }

    public close(): void {
        this.container.delete();
    }
}