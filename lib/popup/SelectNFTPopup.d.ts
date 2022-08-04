import { DomNode, Popup } from "skydapp-browser";
export default class SelectNFTPopup extends Popup {
    content: DomNode;
    private nftContainer;
    private contractAddressInput;
    private tokenIdInput;
    private nftDisplays;
    private currentNFTDisplay;
    private currentContract;
    private currentTokenId;
    constructor(select: (contract: string, tokenId: string) => void);
    private onNFT;
}
//# sourceMappingURL=SelectNFTPopup.d.ts.map