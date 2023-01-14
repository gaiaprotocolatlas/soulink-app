import { DomNode, el } from "skydapp-browser";

export default class NFTImage extends DomNode {

    constructor(className?: string) {
        super(`.nft-image${className !== undefined ? className : ""}`);
    }

    public set url(url: string) {
        this.empty();

        // video
        if (url.indexOf(".mp4") !== -1) {
            const video = el<HTMLVideoElement>("video.media").appendTo(this);
            video.domElement.src = url;
            video.domElement.playsInline = true;
            video.domElement.defaultMuted = true;
            video.domElement.muted = true;
            video.domElement.loop = true;
            video.domElement.autoplay = true;
            video.domElement.play();
        }

        // image
        else {
            const image = el<HTMLImageElement>("img.media").appendTo(this);
            image.domElement.src = url;
        }
    }
}
