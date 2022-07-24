"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class NotExistsDisplay extends skydapp_browser_1.DomNode {
    constructor() {
        super(".not-exists");
        this.append((0, skydapp_browser_1.el)("p", "The page you’re looking for doesn’t exist."));
    }
}
exports.default = NotExistsDisplay;
//# sourceMappingURL=NotExistsDisplay.js.map