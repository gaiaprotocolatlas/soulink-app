"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const Loading_1 = __importDefault(require("../components/Loading"));
const NFTLoader_1 = __importDefault(require("../NFTLoader"));
const AdminLayout_1 = __importDefault(require("../view/admin/AdminLayout"));
class SelectNFTPopup extends skydapp_browser_1.Popup {
    constructor(select) {
        super(".popup-background");
        this.nftDisplays = {};
        this.append(this.content = (0, skydapp_browser_1.el)(".select-nft-popup", (0, skydapp_browser_1.el)("h1", "Select NFT"), (0, skydapp_browser_1.el)("main", this.nftContainer = (0, skydapp_browser_1.el)(".nft-container"), this.loadMoreButton = (0, skydapp_browser_1.el)("a.load-more", "Load More", {
            click: async () => {
                const loading = new Loading_1.default("Loading...").appendTo(this.content);
                const nfts = await NFTLoader_1.default.loadMore(AdminLayout_1.default.current.address);
                if (nfts.length === 0) {
                    this.loadMoreButton.delete();
                }
                else {
                    for (const nft of nfts) {
                        if (nft.cached_file_url !== null) {
                            this.nftDisplays[`${nft.contract_address}-${nft.token_id}`] = (0, skydapp_browser_1.el)("a.nft", nft.cached_file_url.indexOf(".mp4") !== -1 ? (0, skydapp_browser_1.el)("video", { src: nft.cached_file_url, defaultMuted: true, muted: true, autostart: true }) : (0, skydapp_browser_1.el)("img", { src: nft.cached_file_url }), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { click: () => this.onNFT(nft.contract_address, nft.token_id) }).appendTo(this.nftContainer);
                        }
                    }
                }
                loading.delete();
            },
        })), (0, skydapp_browser_1.el)(".info-form", this.contractAddressInput = (0, skydapp_browser_1.el)("input", {
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
        this.loadNFTs();
    }
    async loadNFTs() {
        const nfts = await NFTLoader_1.default.load(AdminLayout_1.default.current.address);
        for (const nft of nfts) {
            if (nft.cached_file_url !== null) {
                this.nftDisplays[`${nft.contract_address}-${nft.token_id}`] = (0, skydapp_browser_1.el)("a.nft", nft.cached_file_url.indexOf(".mp4") !== -1 ? (0, skydapp_browser_1.el)("video", { src: nft.cached_file_url, defaultMuted: true, muted: true, autostart: true }) : (0, skydapp_browser_1.el)("img", { src: nft.cached_file_url }), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { click: () => this.onNFT(nft.contract_address, nft.token_id) }).appendTo(this.nftContainer);
            }
        }
        if (nfts.length < 50) {
        }
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