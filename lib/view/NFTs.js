"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
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
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".nfts-view", this.nftContainer = (0, skydapp_browser_1.el)(".nft-container")));
                for (const nft of Layout_1.default.current.nfts) {
                    if (nft.cached_file_url !== null) {
                        this.nftContainer.append((0, skydapp_browser_1.el)("a.nft", nft.cached_file_url.indexOf(".mp4") !== -1 ? (0, skydapp_browser_1.el)("video", { src: nft.cached_file_url, defaultMuted: true, muted: true, autostart: true }) : (0, skydapp_browser_1.el)("img", { src: nft.cached_file_url }), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { href: `https://opensea.io/assets/${nft.contract_address}/${nft.token_id}`, target: "_blank" }));
                    }
                }
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