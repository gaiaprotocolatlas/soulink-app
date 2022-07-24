import { constants } from "ethers";
import { BodyNode, DomNode, el, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import Bio from "../../datamodel/Bio";
import Wallet from "../../network/Wallet";

export default class AdminLayout extends View {

    public static current: AdminLayout;
    public content: DomNode;

    private container: DomNode;

    public address = constants.AddressZero;
    public bio: Bio = { links: [] };

    constructor() {
        super();
        AdminLayout.current = this;

        BodyNode.append(this.container = el(".admin-layout",
            el("header",
                el("a", "Links", { click: () => { SkyRouter.go("/admin", undefined, true) } }),
                el("a", "Appearance", { click: () => { SkyRouter.go("/admin/appearance", undefined, true) } }),
                el("a", "Save", { click: () => this.save() }),
            ),
            this.content = el(".content"),
        ));

        document.title = "Soulink Admin";
    }

    public async ready() {
        if (this.address !== constants.AddressZero) {
            return true;
        } else {

            let address = await Wallet.loadAddress();
            if (address === undefined) {
                await Wallet.connect();
                address = await Wallet.loadAddress();
            }

            if (address === undefined) {
                this.content.empty().append(el("p", "Not connected to wallet."));
                return false;
            } else {
                const balance = await SoulinkContract.balanceOf(AdminLayout.current.address);
                if (balance.eq(0)) {
                    SkyRouter.go("/mint", undefined, true);
                    return false;
                } else {
                    const result = await fetch(`${Config.apiURI}/bio/${address}`);
                    const str = await result.text();
                    this.bio = str === "" ? { links: [] } : JSON.parse(str);
                    this.address = address;
                    return true;
                }
            }
        }
    }

    private async save() {
        const signedMessage = await Wallet.signMessage("Save your changes.");
        await fetch(`${Config.apiURI}/bio`, {
            method: "POST",
            body: JSON.stringify({ signedMessage, bio: this.bio }),
        });
    }

    public close(): void {
        this.container.delete();
    }
}