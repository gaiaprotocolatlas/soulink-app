import { DomNode, el, Popup } from "skydapp-browser";
import NFTDisplay from "../components/NFTDisplay";
import NFTLoader from "../NFTLoader";
import AdminLayout from "../view/admin/AdminLayout";

export default class SelectNFTPopup extends Popup {

    public content: DomNode;

    private main: DomNode;
    private nftContainer: DomNode;
    private contractAddressInput: DomNode<HTMLInputElement>;
    private tokenIdInput: DomNode<HTMLInputElement>;
    private nftDisplays: { [key: string]: DomNode } = {};
    private currentNFTDisplay: DomNode | undefined;
    private loadMoreButton: DomNode;

    constructor(
        private currentContract: string | undefined,
        private currentTokenId: string | undefined,
        select: (contract: string | undefined, tokenId: string | undefined) => void,
    ) {
        super(".popup-background");

        this.append(
            this.content = el(".select-nft-popup",
                el("h1", "Select NFT"),
                this.main = el("main",
                    this.nftContainer = el(".nft-container"),
                    this.loadMoreButton = el("a.load-more", "Load More", {
                        click: async () => {
                            const loading = el(".loading").appendTo(this.main, 1);
                            const nfts = await NFTLoader.loadMore(AdminLayout.current.address);
                            for (const nft of nfts) {
                                this.nftDisplays[`${nft.asset_contract.address}-${nft.token_id}`] = el("a.nft",
                                    new NFTDisplay(nft.image_thumbnail_url),
                                    el(".name", nft.name === null ? "" : nft.name),
                                    { click: () => this.selectNFT(nft.asset_contract.address, nft.token_id) },
                                ).appendTo(this.nftContainer);
                            }
                            if (nfts.length < 50) {
                                this.loadMoreButton.delete();
                            }
                            if (this.deleted !== true) {
                                loading.delete();
                            }

                            this.selectNFT(this.currentContract, this.currentTokenId);
                        },
                    }),
                ),
                el(".info-form",
                    this.contractAddressInput = el("input", {
                        placeholder: "Contract Address",
                        keyup: (event) => { if (this.currentTokenId !== undefined) { this.selectNFT(event.target.value, this.currentTokenId) } },
                    }),
                    this.tokenIdInput = el("input", {
                        placeholder: "Token Id",
                        keyup: (event) => { if (this.currentContract !== undefined) { this.selectNFT(this.currentContract, event.target.value) } },
                    }),
                ),
                el(".button-container",
                    el("a.select", "Close", {
                        click: () => this.delete(),
                    }),
                    el("a.select", "Select", {
                        click: () => {
                            select(this.currentContract, this.currentTokenId);
                            this.delete();
                        },
                    }),
                ),
            ),
        );

        this.loadNFTs();
    }

    private async loadNFTs() {
        const loading = el(".loading").appendTo(this.main, 1);
        const nfts = await NFTLoader.load(AdminLayout.current.address);

        this.nftDisplays["empty"] = el("a.nft",
            el(".empty"),
            el(".name", "Empty"),
            { click: () => this.selectNFT(undefined, undefined) },
        ).appendTo(this.nftContainer);

        for (const nft of nfts) {
            this.nftDisplays[`${nft.asset_contract.address}-${nft.token_id}`] = el("a.nft",
                new NFTDisplay(nft.image_thumbnail_url),
                el(".name", nft.name === null ? "" : nft.name),
                { click: () => this.selectNFT(nft.asset_contract.address, nft.token_id) },
            ).appendTo(this.nftContainer);
        }
        if (nfts.length < 50) {
            this.loadMoreButton.delete();
        }
        if (this.deleted !== true) {
            loading.delete();
        }

        this.selectNFT(this.currentContract, this.currentTokenId);
    }

    private selectNFT(contract: string | undefined, tokenId: string | undefined) {

        this.currentContract = contract;
        this.currentTokenId = tokenId;

        this.contractAddressInput.domElement.value = contract ?? "";
        this.tokenIdInput.domElement.value = tokenId ?? "";

        this.currentNFTDisplay?.deleteClass("selected");
        this.currentNFTDisplay = this.nftDisplays[contract === undefined || tokenId === undefined ? "empty" : `${contract}-${tokenId}`];
        this.currentNFTDisplay?.addClass("selected");
    }
}
