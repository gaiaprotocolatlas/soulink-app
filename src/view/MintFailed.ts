import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";

export default class MintFailed extends View {

    private container: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".mint-failed-view",
            new ResponsiveImage("img", "/images/mint-failed.png"),
            el("p", "Oh! Something went wrong, Try again."),
            { click: () => SkyRouter.go("/mint", undefined, true) },
        ));
    }

    public close(): void {
        this.container.delete();
    }
}
