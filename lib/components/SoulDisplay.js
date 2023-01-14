import { DomNode, el, SkyRouter } from "skydapp-browser";
import { SkyUtil } from "skydapp-common";
import PFPDisplay from "./PFPDisplay";
export default class SoulDisplay extends DomNode {
    name;
    constructor(bio, color, ...children) {
        super(".soul-display");
        const name = bio.cachedName ?? bio.id;
        this.append(el(".pfp-container", new PFPDisplay(bio.cachedPFP), this.name = el(".name", name.indexOf("0x") === 0 ? SkyUtil.shortenAddress(name) : name), { click: () => SkyRouter.go(`/${name}`, undefined, true) }), ...children);
        this.name.style({ color });
    }
}
//# sourceMappingURL=SoulDisplay.js.map