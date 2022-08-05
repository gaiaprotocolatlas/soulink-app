"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../Config"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const PFPDisplay_1 = __importDefault(require("./PFPDisplay"));
class SoulDisplay extends skydapp_browser_1.DomNode {
    constructor(address, ...children) {
        super(".soul-display");
        this.address = address;
        this.append((0, skydapp_browser_1.el)(".pfp-container", this.pfp = (0, skydapp_browser_1.el)(".pfp"), this.name = (0, skydapp_browser_1.el)(".name", "...")), ...children);
        this.loadPFP();
        this.loadName();
    }
    async loadPFP() {
        const result = await fetch(`${Config_1.default.apiURI}/pfp/${this.address}`);
        const str = await result.text();
        const data = str === "" ? undefined : JSON.parse(str);
        this.pfp.empty().append(new PFPDisplay_1.default(data?.address, data?.tokenId));
    }
    async loadName() {
        const name = await NetworkProvider_1.default.lookupAddress(this.address);
        this.name.empty().appendText(name.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(name) : name);
        this.pfp.onDom("click", () => skydapp_browser_1.SkyRouter.go(`/${name}`, undefined, true));
        this.name.onDom("click", () => skydapp_browser_1.SkyRouter.go(`/${name}`, undefined, true));
    }
}
exports.default = SoulDisplay;
//# sourceMappingURL=SoulDisplay.js.map