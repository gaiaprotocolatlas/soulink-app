"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class Loading extends skydapp_browser_1.DomNode {
    constructor(message) {
        super(".loading-display");
        this.append((0, skydapp_browser_1.el)(".bar"), (0, skydapp_browser_1.el)("p", message));
    }
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map