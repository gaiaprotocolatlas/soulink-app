"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const PFPDisplay_1 = __importDefault(require("./PFPDisplay"));
class SoulDisplay extends skydapp_browser_1.DomNode {
    constructor(bio, color, ...children) {
        super(".soul-display");
        const name = bio.cachedName ?? bio.id;
        this.append((0, skydapp_browser_1.el)(".pfp-container", new PFPDisplay_1.default(bio.cachedPFP), this.name = (0, skydapp_browser_1.el)(".name", name.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(name) : name), { click: () => skydapp_browser_1.SkyRouter.go(`/${name}`, undefined, true) }), ...children);
        this.name.style({ color });
    }
}
exports.default = SoulDisplay;
//# sourceMappingURL=SoulDisplay.js.map