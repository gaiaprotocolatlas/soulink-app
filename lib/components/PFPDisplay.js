import { DomNode } from "skydapp-browser";
export default class PFPDisplay extends DomNode {
    constructor(url) {
        if (url !== undefined && url.indexOf(".mp4") !== -1) {
            super("video.pfp-display");
            this.domElement.src = url;
            this.domElement.playsInline = true;
            this.domElement.defaultMuted = true;
            this.domElement.muted = true;
            this.domElement.loop = true;
            this.domElement.autoplay = true;
            this.domElement.play();
        }
        else {
            super("img.pfp-display");
            this.domElement.src = url ?? "/images/default-profile.png";
        }
    }
}
//# sourceMappingURL=PFPDisplay.js.map