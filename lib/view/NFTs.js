"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const NFTDisplay_1 = __importDefault(require("../components/NFTDisplay"));
const NFTLoader_1 = __importDefault(require("../NFTLoader"));
const Layout_1 = __importDefault(require("./Layout"));
class NFTs extends skydapp_common_1.View {
    constructor(params) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout_1.default.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                let loadMoreButton;
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".nfts-view", this.nftContainer = (0, skydapp_browser_1.el)(".nft-container"), loadMoreButton = (0, skydapp_browser_1.el)("a.load-more", "Load More", {
                    click: async () => {
                        if (Layout_1.default.current.currentAddress !== undefined) {
                            const loading = (0, skydapp_browser_1.el)(".loading").appendTo(this.container, 1);
                            const nfts = await NFTLoader_1.default.loadMore(Layout_1.default.current.currentAddress);
                            for (const nft of nfts) {
                                this.nftContainer.append((0, skydapp_browser_1.el)("a.nft", new NFTDisplay_1.default(nft.image_thumbnail_url), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { href: nft.permalink, target: "_blank" }));
                            }
                            if (nfts.length < 50) {
                                loadMoreButton.delete();
                            }
                            if (this.closed !== true) {
                                loading.delete();
                            }
                        }
                    },
                })));
                (async () => {
                    if (Layout_1.default.current.currentAddress !== undefined) {
                        const loading = (0, skydapp_browser_1.el)(".loading").appendTo(this.container, 1);
                        const nfts = await NFTLoader_1.default.load(Layout_1.default.current.currentAddress);
                        for (const nft of nfts) {
                            this.nftContainer?.append((0, skydapp_browser_1.el)("a.nft", new NFTDisplay_1.default(nft.image_thumbnail_url), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { href: nft.permalink, target: "_blank" }));
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
    changeParams(params, uri) {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
exports.default = NFTs;
//# sourceMappingURL=NFTs.js.map