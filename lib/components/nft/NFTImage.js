import { DomNode, el } from "skydapp-browser";
export default class NFTImage extends DomNode {
    constructor(className) {
        super(`.nft-image${className !== undefined ? className : ""}`);
    }
    set url(url) {
        this.empty();
        if (url.indexOf(".mp4") !== -1) {
            const video = el("video.media").appendTo(this);
            video.domElement.src = url;
            video.domElement.playsInline = true;
            video.domElement.defaultMuted = true;
            video.domElement.muted = true;
            video.domElement.loop = true;
            video.domElement.autoplay = true;
            video.domElement.play();
        }
        else {
            const image = el("img.media").appendTo(this);
            image.domElement.src = url;
        }
    }
}
//# sourceMappingURL=NFTImage.js.map