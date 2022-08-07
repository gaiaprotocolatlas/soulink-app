import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import NFTDisplay from "../components/NFTDisplay";
import NFTLoader from "../NFTLoader";
import Layout from "./Layout";

export default class NFTs extends View {

    private container: DomNode | undefined;
    private nftContainer: DomNode | undefined;

    constructor(params: ViewParams) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    private async load(addressOrEns: string) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {

                let loadMoreButton: DomNode;
                Layout.current.content.append(this.container = el(".nfts-view",
                    this.nftContainer = el(".nft-container"),
                    loadMoreButton = el("a.load-more", "Load More", {
                        click: async () => {
                            const loading = el(".loading").appendTo(this.container!);
                            if (Layout.current.currentAddress !== undefined) {
                                const nfts = await NFTLoader.loadMore(Layout.current.currentAddress);
                                if (nfts.length === 0) {
                                    loadMoreButton.delete();
                                } else {
                                    for (const nft of nfts) {
                                        if (nft.cached_file_url !== null) {
                                            this.nftContainer!.append(el("a.nft",
                                                new NFTDisplay(nft.cached_file_url),
                                                el(".name", nft.name === null ? "" : nft.name),
                                                { href: `https://opensea.io/assets/${nft.contract_address}/${nft.token_id}`, target: "_blank" },
                                            ));
                                        }
                                    }
                                }
                            }
                            if (this.closed !== true) {
                                loading.delete();
                            }
                        },
                    }),
                ));

                (async () => {
                    if (Layout.current.currentAddress !== undefined) {
                        const loading = el(".loading").appendTo(this.container!);
                        const nfts = await NFTLoader.load(Layout.current.currentAddress);
                        for (const nft of nfts) {
                            if (nft.cached_file_url !== null) {
                                this.nftContainer?.append(el("a.nft",
                                    new NFTDisplay(nft.cached_file_url),
                                    el(".name", nft.name === null ? "" : nft.name),
                                    { href: `https://opensea.io/assets/${nft.contract_address}/${nft.token_id}`, target: "_blank" },
                                ));
                            }
                        }
                        if (nfts.length < 50) {
                            loadMoreButton.delete();
                        }
                        if (this.closed !== true) {
                            loading.delete();
                        }
                    }
                })();
            }
        });
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    public close(): void {
        this.container?.delete();
        super.close();
    }
}
