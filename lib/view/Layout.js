"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const BookmarkManager_1 = __importDefault(require("../BookmarkManager"));
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
        this.links = {};
        this.bookmarkHandler = (address) => {
            if (address === this.currentAddress) {
                this.bookmarkButton.empty().append((0, skydapp_browser_1.el)("i.fa-solid.fa-star"));
                this.bookmarkButton.addClass("bookmarked");
            }
        };
        this.unbookmarkHandler = (address) => {
            if (address === this.currentAddress) {
                this.bookmarkButton.empty().append((0, skydapp_browser_1.el)("i.fa-regular.fa-star"));
                this.bookmarkButton.deleteClass("bookmarked");
            }
        };
        Layout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".layout", (0, skydapp_browser_1.el)("header", this.editButton = (0, skydapp_browser_1.el)("a.edit", (0, skydapp_browser_1.el)("i.fa-solid.fa-pen"), {
            click: () => skydapp_browser_1.SkyRouter.go("/admin", undefined, true),
        }), this.bookmarkButton = (0, skydapp_browser_1.el)("a.bookmark", (0, skydapp_browser_1.el)("i.fa-regular.fa-star")), (0, skydapp_browser_1.el)(".menu", this.links["links"] = (0, skydapp_browser_1.el)("a", "Links", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}`, undefined, true); } }), this.links["souls"] = (0, skydapp_browser_1.el)("a.long", "Linked Souls", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true); } }), this.links["nfts"] = (0, skydapp_browser_1.el)("a", "NFTs", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true); } })), (0, skydapp_browser_1.el)("a.card", (0, skydapp_browser_1.el)("i.fa-solid.fa-id-card-clip"), { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/card`, undefined, true); } })), (0, skydapp_browser_1.el)("main", this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/logo.png"), {
            click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true),
        }))));
        this.highlight(uri);
        BookmarkManager_1.default.on("bookmark", this.bookmarkHandler);
        BookmarkManager_1.default.on("unbookmark", this.unbookmarkHandler);
    }
    async ready(addressOrEns, proc) {
        const loading = new Loading_1.default("Loading...").appendTo(this.container);
        if (this.addressOrEns !== addressOrEns) {
            this.addressOrEns = addressOrEns;
            if (addressOrEns.indexOf("0x") === 0) {
                this.currentAddress = addressOrEns;
            }
            else {
                const result = await fetch(`${Config_1.default.apiURI}/cached-address/${addressOrEns}`);
                const cachedAddress = await result.text();
                if (cachedAddress !== "") {
                    this.currentAddress = cachedAddress;
                }
                else {
                    const address = await NetworkProvider_1.default.resolveName(addressOrEns);
                    if (address !== null) {
                        this.currentAddress = address;
                    }
                }
            }
            const result = await fetch(`${Config_1.default.apiURI}/bio/${this.currentAddress}`);
            const str = await result.text();
            this.profile.empty();
            this.content.empty();
            if (str === "") {
                document.title = "Soulink | Page Not Found";
                this.content.append(new NotExistsDisplay_1.default());
            }
            else {
                this.bio = JSON.parse(str);
                const name = addressOrEns.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(addressOrEns) : addressOrEns;
                document.title = `${name} | Soulink`;
                this.profile.append(this.pfpContainer = (0, skydapp_browser_1.el)(".pfp-container"), (0, skydapp_browser_1.el)(".name", name), (0, skydapp_browser_1.el)(".introduce", this.bio.introduce));
                this.profile.style({ color: this.bio.color });
                this.loadBackground();
                this.loadPFP();
                this.showButtons();
            }
            await fetch(`${Config_1.default.apiURI}/cache/${this.currentAddress}`);
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
        this.pfpContainer?.empty().append((0, skydapp_browser_1.el)("img.pfp-display", { src: this.bio.cachedPFP ?? "/images/default-profile.png" }));
    }
    async showButtons() {
        this.editButton.deleteClass("show");
        this.bookmarkButton.addClass("show");
        this.bookmarkButton.empty().append((0, skydapp_browser_1.el)("i.fa-regular.fa-star"));
        this.bookmarkButton.deleteClass("bookmarked");
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress === undefined) {
            if (this.currentAddress !== undefined && BookmarkManager_1.default.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
            this.bookmarkButton.onDom("click", () => {
                if (this.currentAddress !== undefined) {
                    BookmarkManager_1.default.toggle(this.currentAddress);
                }
            });
        }
        else if (this.currentAddress !== undefined && this.currentAddress !== walletAddress) {
            const isLiked = await SoulinkContract_1.default.isLinked(await SoulinkContract_1.default.getTokenId(this.currentAddress), await SoulinkContract_1.default.getTokenId(walletAddress));
            if (isLiked !== true) {
                this.profile.append((0, skydapp_browser_1.el)("a.request-soulink-button", "Request Soulink", {
                    click: async () => {
                        const deadline = Math.floor(Date.now() / 1000) + 315360000;
                        const signature = await Wallet_1.default.signTypedData(walletAddress, "Soulink", "1", SoulinkContract_1.default.address, "RequestLink", [
                            { name: "to", type: "address" },
                            { name: "deadline", type: "uint256" },
                        ], {
                            to: this.currentAddress,
                            deadline,
                        });
                        await fetch(`${Config_1.default.apiURI}/request`, {
                            method: "POST",
                            body: JSON.stringify({
                                requester: walletAddress,
                                target: this.currentAddress,
                                signature,
                                deadline,
                            }),
                        });
                        new Alert_1.default("Soulink requested.");
                    },
                }));
            }
            if (BookmarkManager_1.default.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
            this.bookmarkButton.onDom("click", () => {
                if (this.currentAddress !== undefined) {
                    BookmarkManager_1.default.toggle(this.currentAddress);
                }
            });
        }
        else {
            this.editButton.addClass("show");
            this.bookmarkButton.deleteClass("show");
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
        BookmarkManager_1.default.off("bookmark", this.bookmarkHandler);
        BookmarkManager_1.default.off("unbookmark", this.unbookmarkHandler);
        this.container.delete();
        super.close();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map