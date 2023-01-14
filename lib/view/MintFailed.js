import { BodyNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
export default class MintFailed extends View {
    container;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".mint-failed-view", new ResponsiveImage("img", "/images/mint-failed.png"), el("p", "Oh! Something went wrong, Try again."), { click: () => SkyRouter.go("/mint", undefined, true) }));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=MintFailed.js.map