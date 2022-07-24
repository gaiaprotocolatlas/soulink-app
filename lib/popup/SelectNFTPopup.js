"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const MetadataLoader_1 = __importDefault(require("../MetadataLoader"));
class SelectNFTPopup extends skydapp_browser_1.Popup {
    constructor(select) {
        super(".popup-background");
        this.append(this.content = (0, skydapp_browser_1.el)(".select-nft-popup", "TEST!"));
        this.loadNFTs();
    }
    async loadNFTs() {
        console.log(await MetadataLoader_1.default.loadMetadata("0xe719516e979d64c641bd92b58591421f8b47d9e8", "0"));
    }
}
exports.default = SelectNFTPopup;
//# sourceMappingURL=SelectNFTPopup.js.map