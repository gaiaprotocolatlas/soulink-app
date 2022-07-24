import { BodyNode, DomNode, el } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
import NotExistsDisplay from "../components/NotExistsDisplay";
import Config from "../Config";
import Bio from "../datamodel/Bio";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private container: DomNode;

    public bio: Bio = { links: [] };

    constructor() {
        super();
        Layout.current = this;

        BodyNode.append(this.container = el(".layout",
            this.content = el(".content"),
        ));
    }

    public async ready(addressOrEns: string) {
        const result = await fetch(`${Config.apiURI}/bio/${addressOrEns}`);
        const str = await result.text();
        if (str === "") {
            document.title = "Soulink | Page Not Found";
            this.content.empty().append(new NotExistsDisplay());
            return false;
        } else {
            document.title = `${addressOrEns.indexOf("0x") === 0 ? SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;
            this.bio = JSON.parse(str);
            return true;
        }
    }

    public close(): void {
        this.container.delete();
    }
}