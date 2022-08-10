"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class PFPDisplay extends skydapp_browser_1.DomNode {
    constructor(url) {
        if (url !== undefined && url.indexOf(".mp4") !== -1) {
            super("video.pfp-display");
            this.domElement.src = url;
            this.domElement.defaultMuted = true;
            this.domElement.muted = true;
            this.domElement.loop = true;
            this.domElement.play();
        }
        else {
            super("img.pfp-display");
            this.domElement.src = url ?? "/images/default-profile.png";
        }
    }
}
exports.default = PFPDisplay;
//# sourceMappingURL=PFPDisplay.js.map