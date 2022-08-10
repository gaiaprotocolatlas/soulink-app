import { DomNode } from "skydapp-browser";

export default class PFPDisplay extends DomNode<HTMLVideoElement> {

    constructor(url: string | undefined) {
        if (url !== undefined && url.indexOf(".mp4") !== -1) {
            super("video.pfp-display");
            this.domElement.src = url;
            this.domElement.defaultMuted = true;
            this.domElement.muted = true;
            this.domElement.loop = true;
            this.domElement.play();
        } else {
            super("img.pfp-display");
            this.domElement.src = url ?? "/images/default-profile.png";
        }
    }
}
