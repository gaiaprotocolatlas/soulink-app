import { DomNode, el, SkyRouter } from "skydapp-browser";
import { SkyUtil } from "skydapp-common";
import Config from "../Config";
import NetworkProvider from "../network/NetworkProvider";
import PFPDisplay from "./PFPDisplay";

export default class SoulDisplay extends DomNode {

    private pfp: DomNode;
    private name: DomNode;

    constructor(private address: string, color: string | undefined, ...children: DomNode[]) {
        super(".soul-display");
        this.append(
            el(".pfp-container",
                this.pfp = el(".pfp"),
                this.name = el(".name", "..."),
            ),
            ...children,
        );
        this.name.style({ color });
        this.loadPFP();
        this.loadName();
    }

    private async loadPFP() {
        const result = await fetch(`${Config.apiURI}/pfp/${this.address}`);
        const str = await result.text();
        if (this.deleted !== true) {
            const data = str === "" ? undefined : JSON.parse(str);
            this.pfp.empty().append(new PFPDisplay(data?.address, data?.tokenId));
        }
    }

    private async loadName() {
        let name = await NetworkProvider.lookupAddress(this.address);
        if (name === null) { name = this.address; }
        if (this.deleted !== true) {
            this.name.empty().appendText(name.indexOf("0x") === 0 ? SkyUtil.shortenAddress(name) : name);
            this.pfp.onDom("click", () => SkyRouter.go(`/${name}`, undefined, true));
            this.name.onDom("click", () => SkyRouter.go(`/${name}`, undefined, true));
        }
    }
}
