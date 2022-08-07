import { DomNode, el, SkyRouter } from "skydapp-browser";
import { SkyUtil } from "skydapp-common";
import Bio from "../datamodel/Bio";

export default class SoulDisplay extends DomNode {

    private name: DomNode;

    constructor(bio: Bio, color: string | undefined, ...children: DomNode[]) {
        super(".soul-display");
        const name = bio.cachedName ?? bio.id!;
        this.append(
            el(".pfp-container",
                el("img.pfp-display", { src: bio.cachedPFP ?? "/images/default-profile.png" }),
                this.name = el(".name", name.indexOf("0x") === 0 ? SkyUtil.shortenAddress(name) : name),
                { click: () => SkyRouter.go(`/${name}`, undefined, true) },
            ),
            ...children,
        );
        this.name.style({ color });
    }
}
