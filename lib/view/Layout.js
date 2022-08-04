"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../components/Loading"));
const NotExistsDisplay_1 = __importDefault(require("../components/NotExistsDisplay"));
const Config_1 = __importDefault(require("../Config"));
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const MetadataLoader_1 = __importDefault(require("../MetadataLoader"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
const Alert_1 = __importDefault(require("../popup/Alert"));
class Layout extends skydapp_common_1.View {
    constructor(params, uri) {
        super();
        this.addressOrEns = "";
        this.bio = { links: [] };
        this.nfts = [];
        this.links = {};
        Layout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".layout", (0, skydapp_browser_1.el)("header", this.editButton = (0, skydapp_browser_1.el)("a.edit", (0, skydapp_browser_1.el)("i.fa-solid.fa-pen"), {
            click: () => skydapp_browser_1.SkyRouter.go("/admin", undefined, true),
        }), (0, skydapp_browser_1.el)(".menu", this.links["links"] = (0, skydapp_browser_1.el)("a", "Links", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}`, undefined, true); } }), this.links["nfts"] = (0, skydapp_browser_1.el)("a", "NFTs", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true); } }), this.links["souls"] = (0, skydapp_browser_1.el)("a", "Linked Souls", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true); } })), (0, skydapp_browser_1.el)("a.card", (0, skydapp_browser_1.el)("i.fa-solid.fa-id-card-clip"), { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/card`, undefined, true); } })), (0, skydapp_browser_1.el)("main", this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/logo.png"), {
            click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true),
        }))));
        this.highlight(uri);
    }
    async ready(addressOrEns, proc) {
        const loading = new Loading_1.default("Loading...").appendTo(this.container);
        if (this.addressOrEns !== addressOrEns) {
            const result = await fetch(`${Config_1.default.apiURI}/cached/${addressOrEns}`);
            const str = await result.text();
            this.profile.empty();
            this.content.empty();
            if (str === "") {
                document.title = "Soulink | Page Not Found";
                this.content.append(new NotExistsDisplay_1.default());
            }
            else {
                const name = addressOrEns.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(addressOrEns) : addressOrEns;
                document.title = `${name} | Soulink`;
                const data = JSON.parse(str);
                this.addressOrEns = addressOrEns;
                this.bio = data.bio;
                this.nfts = data.nfts;
                this.profile.append(this.imageContainer = (0, skydapp_browser_1.el)(".image-container", new skydapp_browser_1.ResponsiveImage("img", "/images/default-profile.png")), (0, skydapp_browser_1.el)(".name", name), (0, skydapp_browser_1.el)(".introduce", this.bio.introduce));
                this.loadBackground();
                this.loadPFP();
                this.showLinkButton(addressOrEns);
            }
        }
        if (this.addressOrEns !== "") {
            await proc();
        }
        loading.delete();
    }
    async loadBackground() {
        this.container.style({ backgroundImage: undefined });
        if (this.bio.background !== undefined) {
            this.container.addClass("loading");
            const metadata = await MetadataLoader_1.default.loadMetadata(this.bio.background.address, this.bio.background.tokenId);
            const url = metadata?.imageInfo?.cachedURL;
            if (url !== undefined) {
                this.container.style({ backgroundImage: `url(${url})` });
            }
            this.container.deleteClass("loading");
        }
    }
    async loadPFP() {
        if (this.bio.pfp !== undefined && this.imageContainer !== undefined) {
            this.imageContainer.empty();
            this.imageContainer.addClass("loading");
            const metadata = await MetadataLoader_1.default.loadMetadata(this.bio.pfp.address, this.bio.pfp.tokenId);
            this.imageContainer.append((0, skydapp_browser_1.el)("img", { src: metadata?.imageInfo?.cachedURL }));
            this.imageContainer.deleteClass("loading");
        }
    }
    async showLinkButton(addressOrEns) {
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const address = await NetworkProvider_1.default.resolveName(addressOrEns);
            if (address !== walletAddress) {
                const isLiked = await SoulinkContract_1.default.isLinked(await SoulinkContract_1.default.getTokenId(address), await SoulinkContract_1.default.getTokenId(walletAddress));
                if (isLiked !== true) {
                    this.profile.append((0, skydapp_browser_1.el)("a.request-soulink-button", "Request Soulink", {
                        click: async () => {
                            const deadline = Math.floor(Date.now() / 1000) + 315360000;
                            const signature = await Wallet_1.default.signTypedData(walletAddress, "Soulink", "1", SoulinkContract_1.default.address, "RequestLink", [
                                { name: "to", type: "address" },
                                { name: "deadline", type: "uint256" },
                            ], {
                                to: address,
                                deadline,
                            });
                            await fetch(`${Config_1.default.apiURI}/request`, {
                                method: "POST",
                                body: JSON.stringify({
                                    requester: walletAddress,
                                    target: address,
                                    signature,
                                    deadline,
                                }),
                            });
                            new Alert_1.default("Soulink requested.");
                        },
                    }));
                }
                this.editButton.deleteClass("show");
            }
            else {
                this.editButton.addClass("show");
            }
        }
    }
    highlight(uri) {
        this.currentLink?.deleteClass("on");
        if (uri.indexOf("/") === -1) {
            this.currentLink = this.links["links"];
        }
        else {
            uri = uri.substring(uri.indexOf("/") + 1);
            this.currentLink = this.links[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentLink?.addClass("on");
    }
    changeParams(params, uri) {
        this.highlight(uri);
    }
    close() {
        this.container.delete();
        super.close();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map