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
                            if (Layout.current.currentAddress !== undefined) {
                                const loading = el(".loading").appendTo(this.container!, 1);
                                const nfts = await NFTLoader.loadMore(Layout.current.currentAddress);
                                for (const nft of nfts) {
                                    if (this.nftContainer !== undefined) {
                                        const nftDisplay = el("a.nft",
                                            new NFTDisplay(nft.image_thumbnail_url),
                                            el(".name", nft.name === null ? "" : nft.name),
                                            { href: nft.permalink, target: "_blank" },
                                        ).appendTo(this.nftContainer);
                                        nftDisplay.style({ color: Layout.current.bio.color });
                                    }
                                }
                                if (nfts.length < 50) {
                                    loadMoreButton.delete();
                                }
                                if (this.closed !== true) {
                                    loading.delete();
                                }
                            }
                        },
                    }),
                ));

                (async () => {
                    if (Layout.current.currentAddress !== undefined) {
                        const loading = el(".loading").appendTo(this.container!, 1);
                        const nfts = await NFTLoader.load(Layout.current.currentAddress);
                        for (const nft of nfts) {
                            if (this.nftContainer !== undefined) {
                                const nftDisplay = el("a.nft",
                                    new NFTDisplay(nft.image_thumbnail_url),
                                    el(".name", nft.name === null ? "" : nft.name),
                                    { href: nft.permalink, target: "_blank" },
                                ).appendTo(this.nftContainer);
                                nftDisplay.style({ color: Layout.current.bio.color });
                            }
                        }
                        if (nfts.length === 0) {
                            this.container?.append(el("p.empty", "This Soul does not own any NFTs yet."));
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
