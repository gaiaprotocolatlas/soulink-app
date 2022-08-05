import { DomNode, el, Popup } from "skydapp-browser";
import Loading from "../components/Loading";
import NFTLoader from "../NFTLoader";
import AdminLayout from "../view/admin/AdminLayout";

export default class SelectNFTPopup extends Popup {

    public content: DomNode;

    private nftContainer: DomNode;
    private contractAddressInput: DomNode<HTMLInputElement>;
    private tokenIdInput: DomNode<HTMLInputElement>;
    private nftDisplays: { [key: string]: DomNode } = {};
    private currentNFTDisplay: DomNode | undefined;
    private loadMoreButton: DomNode;

    private currentContract: string | undefined;
    private currentTokenId: string | undefined;

    constructor(select: (contract: string | undefined, tokenId: string | undefined) => void) {
        super(".popup-background");

        this.append(
            this.content = el(".select-nft-popup",
                el("h1", "Select NFT"),
                el("main",
                    this.nftContainer = el(".nft-container"),
                    this.loadMoreButton = el("a.load-more", "Load More", {
                        click: async () => {
                            const loading = new Loading("Loading...").appendTo(this.content);
                            const nfts = await NFTLoader.loadMore(AdminLayout.current.address);
                            if (nfts.length === 0) {
                                this.loadMoreButton.delete();
                            } else {
                                for (const nft of nfts) {
                                    if (nft.cached_file_url !== null) {
                                        this.nftDisplays[`${nft.contract_address}-${nft.token_id}`] = el("a.nft",
                                            nft.cached_file_url.indexOf(".mp4") !== -1 ? el("video", { src: nft.cached_file_url, defaultMuted: true, muted: true, autostart: true }) : el("img", { src: nft.cached_file_url }),
                                            el(".name", nft.name === null ? "" : nft.name),
                                            { click: () => this.onNFT(nft.contract_address, nft.token_id) },
                                        ).appendTo(this.nftContainer);
                                    }
                                }
                            }
                            loading.delete();
                        },
                    }),
                ),
                el(".info-form",
                    this.contractAddressInput = el("input", {
                        placeholder: "Contract Address",
                        keyup: (event) => { if (this.currentTokenId !== undefined) { this.onNFT(event.target.value, this.currentTokenId) } },
                    }),
                    this.tokenIdInput = el("input", {
                        placeholder: "Token Id",
                        keyup: (event) => { if (this.currentContract !== undefined) { this.onNFT(this.currentContract, event.target.value) } },
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
        const nfts = await NFTLoader.load(AdminLayout.current.address);
        for (const nft of nfts) {
            if (nft.cached_file_url !== null) {
                this.nftDisplays[`${nft.contract_address}-${nft.token_id}`] = el("a.nft",
                    nft.cached_file_url.indexOf(".mp4") !== -1 ? el("video", { src: nft.cached_file_url, defaultMuted: true, muted: true, autostart: true }) : el("img", { src: nft.cached_file_url }),
                    el(".name", nft.name === null ? "" : nft.name),
                    { click: () => this.onNFT(nft.contract_address, nft.token_id) },
                ).appendTo(this.nftContainer);
            }
        }
        if (nfts.length < 50) {
            //this.loadMoreButton.delete();
        }
    }

    private onNFT(contract: string, tokenId: string) {

        this.currentContract = contract;
        this.currentTokenId = tokenId;

        this.contractAddressInput.domElement.value = contract;
        this.tokenIdInput.domElement.value = tokenId;

        this.currentNFTDisplay?.deleteClass("selected");
        this.currentNFTDisplay = this.nftDisplays[`${contract}-${tokenId}`];
        this.currentNFTDisplay?.addClass("selected");
    }
}
