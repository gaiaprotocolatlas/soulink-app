import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
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

                Layout.current.content.append(this.container = el(".nfts-view",
                    this.nftContainer = el(".nft-container"),
                ));

                for (const nft of Layout.current.nfts) {
                    if (nft.cached_file_url !== null) {
                        this.nftContainer.append(el("a.nft",
                            nft.cached_file_url.indexOf(".mp4") !== -1 ? el("video", { src: nft.cached_file_url, defaultMuted: true, muted: true, autostart: true }) : el("img", { src: nft.cached_file_url }),
                            el(".name", nft.name === null ? "" : nft.name),
                            { href: `https://opensea.io/assets/${nft.contract_address}/${nft.token_id}`, target: "_blank" },
                        ));
                    }
                }
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
