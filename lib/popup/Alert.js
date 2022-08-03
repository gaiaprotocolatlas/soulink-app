"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class Alert extends skydapp_browser_1.Popup {
    constructor(message) {
        super(".popup-background");
        this.append(this.content = (0, skydapp_browser_1.el)(".alert", (0, skydapp_browser_1.el)("p", message), (0, skydapp_browser_1.el)("a", "OK", {
            click: () => this.delete(),
        })));
    }
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map