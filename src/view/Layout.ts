import { BodyNode, DomNode, el } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
import NotExistsDisplay from "../components/NotExistsDisplay";
import Config from "../Config";
import Bio from "../datamodel/Bio";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private profile: DomNode;
    private container: DomNode;

    public bio: Bio = { links: [] };

    constructor() {
        super();
        Layout.current = this;

        BodyNode.append(this.container = el(".layout",
            this.profile = el(".profile"),
            this.content = el(".content"),
        ));
    }

    public async ready(addressOrEns: string) {
        const result = await fetch(`${Config.apiURI}/bio/${addressOrEns}`);
        const str = await result.text();

        this.content.empty();
        this.profile.empty();

        if (str === "") {
            document.title = "Soulink | Page Not Found";
            this.content.append(new NotExistsDisplay());
            return false;
        } else {
            document.title = `${addressOrEns.indexOf("0x") === 0 ? SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;
            this.bio = JSON.parse(str);
            this.showLinkButton(addressOrEns);
            return true;
        }
    }

    private async showLinkButton(addressOrEns: string) {
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const address = await NetworkProvider.resolveName(addressOrEns);
            if (address !== walletAddress) {
                this.profile.append(el("a", "Request Soulink", {
                    click: () => {

                    },
                }));
            }
        }
    }

    public close(): void {
        this.container.delete();
    }
}