import { DomNode } from "skydapp-browser";
export default class NFTImage extends DomNode {
    constructor(url) {
        if (url.indexOf(".mp4") !== -1) {
            super("video.nft-image");
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
            super("img.nft-image");
            const domElement = this.domElement;
            domElement.src = url;
        }
    }
}
//# sourceMappingURL=NFTImage.js.map