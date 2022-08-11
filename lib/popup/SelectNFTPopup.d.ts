import { DomNode, Popup } from "skydapp-browser";
export default class SelectNFTPopup extends Popup {
    private currentContract;
    private currentTokenId;
    content: DomNode;
    private main;
    private nftContainer;
    private contractAddressInput;
    private tokenIdInput;
    private nftDisplays;
    private currentNFTDisplay;
    private loadMoreButton;
    constructor(currentContract: string | undefined, currentTokenId: string | undefined, select: (contract: string | undefined, tokenId: string | undefined) => void);
    private loadNFTs;
    private selectNFT;
}
//# sourceMappingURL=SelectNFTPopup.d.ts.map