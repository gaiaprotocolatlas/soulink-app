import { DomNode, el, ResponsiveImage } from "skydapp-browser";
import MetadataLoader from "../MetadataLoader";

export default class PFPDisplay extends DomNode {

    constructor(private contract: string | undefined, private tokenId: string | undefined) {
        super(".pfp-display.loading");
        this.load();
    }

    private async load() {
        if (this.contract === undefined || this.tokenId === undefined) {
            this.append(new ResponsiveImage("img", "/images/default-profile.png"));
        } else {
            const metadata: any = await MetadataLoader.loadMetadata(this.contract, this.tokenId);
            this.append(el("img", { src: metadata?.imageInfo?.cachedURL }));
        }
        this.deleteClass("loading");
    }
}
