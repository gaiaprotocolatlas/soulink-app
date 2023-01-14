import { BodyNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
export default class MintSuccess extends View {
    container;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".mint-success-view", new ResponsiveImage("img", "/images/mint-image.png"), el("p", "Yay! Now ", el("b", "Soulink"), " is forever yours !"), { click: () => SkyRouter.go("/me", undefined, true) }));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=MintSuccess.js.map