import { constants } from "ethers";
import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Loading from "../../components/Loading";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import Bio from "../../datamodel/Bio";
import NFTInfo from "../../datamodel/NFTInfo";
import MetadataLoader from "../../MetadataLoader";
import Wallet from "../../network/Wallet";
import Alert from "../../popup/Alert";
import SelectNFTPopup from "../../popup/SelectNFTPopup";
import Utils from "../../Utils";

export default class AdminLayout extends View {

    public static current: AdminLayout;
    public content: DomNode;

    private container: DomNode;
    private imageContainer: DomNode | undefined;
    private profile: DomNode;

    public address = constants.AddressZero;

    private prevBio: Bio = { links: [] };
    public bio: Bio = { links: [] };
    public nfts: NFTInfo[] = [];

    private currentLink: DomNode | undefined;
    private links: { [name: string]: DomNode } = {};
    private saveButton: DomNode;

    constructor(params: ViewParams, uri: string) {
        super();
        AdminLayout.current = this;

        BodyNode.append(this.container = el(".admin-layout",
            el("header",
                el("a.background", el("i.fa-solid.fa-panorama"), {
                    click: () => new SelectNFTPopup(async (address: string | undefined, tokenId: string | undefined) => {
                        if (address === undefined || tokenId === undefined) {
                            delete this.bio.background;
                        } else {
                            this.bio.background = { address, tokenId };
                        }
                        this.checkChanges();
                        this.loadBackground();
                    }),
                }),
                el(".menu",
                    this.links["links"] = el("a", "Links", { click: () => { SkyRouter.go("/admin", undefined, true) } }),
                    //this.links["appearance"] = el("a", "Appearance", { click: () => { SkyRouter.go("/admin/appearance", undefined, true) } }),
                    this.links["souls"] = el("a", "Souls", { click: () => { SkyRouter.go("/admin/souls", undefined, true) } }),
                ),
                this.saveButton = el("a.save", "Save", { click: () => this.save() }),
            ),
            el("main",
                this.profile = el(".profile"),
                this.content = el(".content"),
            ),
            el("footer",
                el("a", new ResponsiveImage("img", "/images/logo.png"), {
                    click: () => SkyRouter.go("/", undefined, true),
                }),
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

            this.profile.empty();
            this.content.empty();

            if (address === undefined) {
                this.content.append(el("p", "Not connected to wallet."));
            } else {
                const balance = await SoulinkContract.balanceOf(address);
                if (balance.eq(0)) {
                    SkyRouter.go("/mint", undefined, true);
                } else {

                    const result = await fetch(`${Config.apiURI}/all/${address}`);
                    const str = await result.text();
                    const data = str === "" ? { bio: { links: [] }, nfts: [] } : JSON.parse(str);

                    this.bio = data.bio;
                    this.nfts = data.nfts;
                    this.prevBio = JSON.parse(JSON.stringify(this.bio));
                    this.address = address;

                    this.profile.append(
                        el(".pfp",
                            this.imageContainer = el(".image-container",
                                new ResponsiveImage("img", "/images/default-profile.png"),
                            ),
                            el(".add", el("i.fa-solid.fa-plus")),
                            {
                                click: () => new SelectNFTPopup(async (address: string | undefined, tokenId: string | undefined) => {
                                    if (address === undefined || tokenId === undefined) {
                                        delete this.bio.pfp;
                                    } else {
                                        this.bio.pfp = { address, tokenId };
                                    }
                                    this.checkChanges();
                                    this.loadPFP();
                                }),
                            },
                        ),
                        el(".name", await Utils.loadShortenName(address)),
                    );

                    const textarea = el("textarea.introduce", this.bio.introduce, {
                        placeholder: "About Me.",
                        keyup: (event) => {
                            this.bio.introduce = event.target.value;
                            this.checkChanges();
                            event.target.style.height = "1px";
                            event.target.style.height = `${event.target.scrollHeight}px`;
                        },
                    }).appendTo(this.profile);

                    textarea.domElement.style.height = "1px";
                    textarea.domElement.style.height = `${textarea.domElement.scrollHeight}px`;

                    this.loadBackground();
                    this.loadPFP();

                    await proc();
                }
            }
        }
        loading.delete();
    }

    private async loadBackground() {
        this.container.style({ backgroundImage: undefined });
        if (this.bio.background !== undefined) {
            this.container.addClass("loading");
            const metadata: any = await MetadataLoader.loadMetadata(this.bio.background.address, this.bio.background.tokenId);
            const url = metadata?.imageInfo?.cachedURL;
            if (url !== undefined) {
                this.container.style({ backgroundImage: `url(${url})` });
            }
            this.container.deleteClass("loading");
        }
    }

    private async loadPFP() {
        if (this.imageContainer !== undefined) {
            if (this.bio.pfp !== undefined) {
                this.imageContainer.empty();
                this.imageContainer.addClass("loading");
                const metadata: any = await MetadataLoader.loadMetadata(this.bio.pfp.address, this.bio.pfp.tokenId);
                this.imageContainer.append(el("img", { src: metadata?.imageInfo?.cachedURL }));
                this.imageContainer.deleteClass("loading");
            } else {
                this.imageContainer.empty().append(new ResponsiveImage("img", "/images/default-profile.png"));
            }
        }
    }

    private async save() {
        const signedMessage = await Wallet.signMessage("Save your changes.");
        const loading = new Loading("Saving...").appendTo(BodyNode);
        await fetch(`${Config.apiURI}/bio`, {
            method: "POST",
            body: JSON.stringify({ signedMessage, bio: this.bio }),
        });
        this.prevBio = JSON.parse(JSON.stringify(this.bio));
        this.checkChanges();
        loading.delete();
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