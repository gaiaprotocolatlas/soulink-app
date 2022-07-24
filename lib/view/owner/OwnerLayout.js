"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
class OwnerLayout extends skydapp_common_1.View {
    constructor() {
        super();
        OwnerLayout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".owner-layout", this.content = (0, skydapp_browser_1.el)(".content")));
    }
    set title(title) {
        document.title = `${title} | Soulink`;
    }
    close() {
        this.container.delete();
    }
}
exports.default = OwnerLayout;
//# sourceMappingURL=OwnerLayout.js.map