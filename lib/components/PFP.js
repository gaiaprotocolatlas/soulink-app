import { DomNode } from "skydapp-browser";
export default class PFP extends DomNode {
    constructor(url) {
        if (url !== undefined && url.indexOf(".mp4") !== -1) {
            super("video.pfp");
            const domElement = this.domElement;
            domElement.src = url;
            domElement.playsInline = true;
            domElement.defaultMuted = true;
            domElement.muted = true;
            domElement.loop = true;
            domElement.autoplay = true;
            domElement.play();
        }
        else {
            super("img.pfp");
            const domElement = this.domElement;
            domElement.src = url ?? "/images/default-profile.png";
        }
    }
}
//# sourceMappingURL=PFP.js.map