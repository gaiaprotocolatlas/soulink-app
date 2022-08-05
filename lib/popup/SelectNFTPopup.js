"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class SelectNFTPopup extends skydapp_browser_1.Popup {
    constructor(select) {
        super(".popup-background");
        this.nftDisplays = {};
        this.append(this.content = (0, skydapp_browser_1.el)(".select-nft-popup", (0, skydapp_browser_1.el)("h1", "Select NFT"), this.nftContainer = (0, skydapp_browser_1.el)(".nft-container"), (0, skydapp_browser_1.el)(".info-form", this.contractAddressInput = (0, skydapp_browser_1.el)("input", {
            placeholder: "Contract Address",
            keyup: (event) => { if (this.currentTokenId !== undefined) {
                this.onNFT(event.target.value, this.currentTokenId);
            } },
        }), this.tokenIdInput = (0, skydapp_browser_1.el)("input", {
            placeholder: "Token Id",
            keyup: (event) => { if (this.currentContract !== undefined) {
                this.onNFT(this.currentContract, event.target.value);
            } },
        })), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("a.select", "Close", {
            click: () => this.delete(),
        }), (0, skydapp_browser_1.el)("a.select", "Select", {
            click: () => {
                select(this.currentContract, this.currentTokenId);
                this.delete();
            },
        }))));
    }
    onNFT(contract, tokenId) {
        this.currentContract = contract;
        this.currentTokenId = tokenId;
        this.contractAddressInput.domElement.value = contract;
        this.tokenIdInput.domElement.value = tokenId;
        this.currentNFTDisplay?.deleteClass("selected");
        this.currentNFTDisplay = this.nftDisplays[`${contract}-${tokenId}`];
        this.currentNFTDisplay?.addClass("selected");
    }
}
exports.default = SelectNFTPopup;
//# sourceMappingURL=SelectNFTPopup.js.map