import { DomNode } from "skydapp-browser";

export default class NFTDisplay extends DomNode<HTMLVideoElement> {

    constructor(url: string) {
        if (url.indexOf(".mp4") !== -1) {
            super("video.nft-display");
            this.domElement.src = url;
            this.domElement.defaultMuted = true;
            this.domElement.muted = true;
            this.domElement.loop = true;
            this.domElement.play();
        } else {
            super("img.nft-display");
            this.domElement.src = url;
        }
    }
}
