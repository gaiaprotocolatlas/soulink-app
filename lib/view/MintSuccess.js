"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
class MintSuccess extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".mint-success-view", new skydapp_browser_1.ResponsiveImage("img", "/images/mint-image.png"), (0, skydapp_browser_1.el)("p", "Yay! Now ", (0, skydapp_browser_1.el)("b", "Soulink"), " is forever yours !"), { click: () => skydapp_browser_1.SkyRouter.go("/me", undefined, true) }));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
exports.default = MintSuccess;
//# sourceMappingURL=MintSuccess.js.map