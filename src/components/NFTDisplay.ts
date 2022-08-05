import { DomNode, el } from "skydapp-browser";

export default class NFTDisplay extends DomNode {

    constructor(url: string) {
        super(".nft-display");
        if (url.indexOf(".mp4") !== -1) {
            const video: DomNode<HTMLVideoElement> = el<HTMLVideoElement>("video", { src: url }).appendTo(this);
            video.domElement.muted = true;
            video.domElement.loop = true;
            video.domElement.play();
        } else {
            el("img", { src: url }).appendTo(this);
        }
    }
}
