"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class NFTDisplay extends skydapp_browser_1.DomNode {
    constructor(url) {
        super(".nft-display");
        if (url.indexOf(".mp4") !== -1) {
            const video = (0, skydapp_browser_1.el)("video", { src: url }).appendTo(this);
            video.domElement.muted = true;
            video.domElement.loop = true;
            video.domElement.play();
        }
        else {
            (0, skydapp_browser_1.el)("img", { src: url }).appendTo(this);
        }
    }
}
exports.default = NFTDisplay;
//# sourceMappingURL=NFTDisplay.js.map