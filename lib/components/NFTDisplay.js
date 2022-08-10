"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class NFTDisplay extends skydapp_browser_1.DomNode {
    constructor(url) {
        if (url.indexOf(".mp4") !== -1) {
            super("video.nft-display");
            this.domElement.src = url;
            this.domElement.playsInline = true;
            this.domElement.defaultMuted = true;
            this.domElement.muted = true;
            this.domElement.loop = true;
            this.domElement.autoplay = true;
            this.domElement.play();
        }
        else {
            super("img.nft-display");
            this.domElement.src = url;
        }
    }
}
exports.default = NFTDisplay;
//# sourceMappingURL=NFTDisplay.js.map