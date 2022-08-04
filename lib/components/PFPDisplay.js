"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const MetadataLoader_1 = __importDefault(require("../MetadataLoader"));
class PFPDisplay extends skydapp_browser_1.DomNode {
    constructor(contract, tokenId) {
        super(".pfp-display.loading");
        this.contract = contract;
        this.tokenId = tokenId;
        this.load();
    }
    async load() {
        if (this.contract === undefined || this.tokenId === undefined) {
            this.append(new skydapp_browser_1.ResponsiveImage("img", "/images/default-profile.png"));
        }
        else {
            const metadata = await MetadataLoader_1.default.loadMetadata(this.contract, this.tokenId);
            this.append((0, skydapp_browser_1.el)("img", { src: metadata?.imageInfo?.cachedURL }));
        }
        this.deleteClass("loading");
    }
}
exports.default = PFPDisplay;
//# sourceMappingURL=PFPDisplay.js.map