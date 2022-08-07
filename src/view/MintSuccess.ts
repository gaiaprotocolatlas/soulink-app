import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";

export default class MintSuccess extends View {

    private container: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".mint-success-view",
            new ResponsiveImage("img", "/images/mint-image.png"),
            el("p", "Yay! Now ", el("b", "Soulink"), " is forever yours !"),
            { click: () => SkyRouter.go("/admin", undefined, true) },
        ));
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}
