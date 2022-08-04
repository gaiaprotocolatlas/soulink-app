"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
class MintFailed extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".mint-failed-view"));
    }
    close() {
        this.container.delete();
    }
}
exports.default = MintFailed;
//# sourceMappingURL=MintFailed.js.map