import { DomNode, el, Popup } from "skydapp-browser";
import MetadataLoader from "../MetadataLoader";

export default class SelectNFTPopup extends Popup {

    public content: DomNode;

    constructor(select: () => void) {
        super(".popup-background");
        this.append(
            this.content = el(".select-nft-popup",
                "TEST!",
            ),
        );
        this.loadNFTs();
    }

    private async loadNFTs() {
        //TODO: 노드 운용해야함
        console.log(await MetadataLoader.loadMetadata("0xe719516e979d64c641bd92b58591421f8b47d9e8", "0"));
    }
}
