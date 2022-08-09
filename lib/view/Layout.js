"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const BookmarkManager_1 = __importDefault(require("../BookmarkManager"));
const Loading_1 = __importDefault(require("../components/Loading"));
const NFTDisplay_1 = __importDefault(require("../components/NFTDisplay"));
const NotExistsDisplay_1 = __importDefault(require("../components/NotExistsDisplay"));
const PFPDisplay_1 = __importDefault(require("../components/PFPDisplay"));
const Config_1 = __importDefault(require("../Config"));
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
const Alert_1 = __importDefault(require("../popup/Alert"));
class Layout extends skydapp_common_1.View {
    constructor(params, uri) {
        super();
        this.addressOrEns = "";
        this.bio = { links: [] };
        this.dots = {};
        this.bookmarkHandler = (address) => {
            if (address === this.currentAddress) {
                this.bookmarkButton.empty().append((0, skydapp_browser_1.el)("i.fa-solid.fa-bookmark"));
                this.bookmarkButton.addClass("bookmarked");
            }
        };
        this.unbookmarkHandler = (address) => {
            if (address === this.currentAddress) {
                this.bookmarkButton.empty().append((0, skydapp_browser_1.el)("i.fa-regular.fa-bookmark"));
                this.bookmarkButton.deleteClass("bookmarked");
            }
        };
        Layout.current = this;
        skydapp_browser_1.BodyNode.append(this.background = (0, skydapp_browser_1.el)(".background-container"), this.container = (0, skydapp_browser_1.el)(".layout", (0, skydapp_browser_1.el)("header", this.editButton = (0, skydapp_browser_1.el)("a.edit", (0, skydapp_browser_1.el)("i.fa-solid.fa-pen"), {
            click: () => skydapp_browser_1.SkyRouter.go("/me", undefined, true),
        }), this.bookmarkButton = (0, skydapp_browser_1.el)("a.bookmark", (0, skydapp_browser_1.el)("i.fa-regular.fa-bookmark"), {
            click: () => {
                if (this.currentAddress !== undefined) {
                    BookmarkManager_1.default.toggle(this.currentAddress);
                }
            },
        }), this.menu = (0, skydapp_browser_1.el)(".menu", (0, skydapp_browser_1.el)(".bar", this.dots["links"] = (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)(".dot"), { click: () => skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}`, undefined, true) }), this.dots["souls"] = (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)(".dot"), { click: () => skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true) }), this.dots["nfts"] = (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)(".dot"), { click: () => skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true) })), (0, skydapp_browser_1.el)("a", "Links", { click: () => skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}`, undefined, true) }), (0, skydapp_browser_1.el)("a.long", "Linked Souls", { click: () => { skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true); } }), (0, skydapp_browser_1.el)("a", "NFTs", { click: () => skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true) })), this.dots["card"] = (0, skydapp_browser_1.el)("a.card", (0, skydapp_browser_1.el)("i.fa-solid.fa-id-card-clip"), { click: () => skydapp_browser_1.SkyRouter.go(`/${this.addressOrEns}/card`, undefined, true) })), (0, skydapp_browser_1.el)("main", this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/logo.png"), {
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
                this.menu.style({ color: this.bio.color });
                this.profile.style({ color: this.bio.color });
                this.loadBackground();
                this.loadPFP();
                this.showButtons();
            }
            await fetch(`${Config_1.default.apiURI}/cache/name/${this.currentAddress}`);
        }
        if (this.addressOrEns !== "") {
            await proc();
        }
        loading.delete();
    }
    async loadBackground() {
        this.background.empty();
        if (this.bio.background !== undefined) {
            if (this.bio.cachedBackground !== undefined && this.bio.cachedBackground !== null) {
                this.background.append(new NFTDisplay_1.default(this.bio.cachedBackground));
            }
            else {
                this.background.addClass("loading");
                const result = await fetch(`${Config_1.default.apiURI}/background/${this.currentAddress}`);
                const str = await result.text();
                if (str !== "") {
                    this.background.append(new NFTDisplay_1.default(str));
                }
                this.background.deleteClass("loading");
            }
        }
    }
    async loadPFP() {
        if (this.pfpContainer !== undefined) {
            this.pfpContainer.empty();
            if (this.bio?.pfp === undefined) {
                this.pfpContainer.append(new skydapp_browser_1.ResponsiveImage("img", "/images/default-profile.png"));
            }
            else if (this.bio.cachedPFP !== undefined && this.bio.cachedPFP !== null) {
                this.pfpContainer.append(new PFPDisplay_1.default(this.bio.cachedPFP));
            }
            else {
                this.pfpContainer.addClass("loading");
                const result = await fetch(`${Config_1.default.apiURI}/pfp/${this.currentAddress}`);
                const str = await result.text();
                if (str !== "") {
                    this.pfpContainer.append(new PFPDisplay_1.default(str));
                }
                this.pfpContainer.deleteClass("loading");
            }
        }
    }
    async showButtons() {
        this.editButton.deleteClass("show");
        this.bookmarkButton.deleteClass("show");
        this.bookmarkButton.empty().append((0, skydapp_browser_1.el)("i.fa-regular.fa-bookmark"));
        this.bookmarkButton.deleteClass("bookmarked");
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress === undefined) {
            this.bookmarkButton.addClass("show");
            if (this.currentAddress !== undefined && BookmarkManager_1.default.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
        }
        else if (this.currentAddress !== undefined && this.currentAddress !== walletAddress) {
            const isLiked = await SoulinkContract_1.default.isLinked(await SoulinkContract_1.default.getTokenId(this.currentAddress), await SoulinkContract_1.default.getTokenId(walletAddress));
            if (isLiked !== true) {
                const result1 = await fetch(`${Config_1.default.apiURI}/request/${walletAddress}/${this.currentAddress}`);
                const str1 = await result1.text();
                if (str1 !== "") {
                    const request = JSON.parse(str1);
                    if (request.accept !== undefined) {
                        const help = (0, skydapp_browser_1.el)("p.help", "This person has accepted your Soulink request!").appendTo(this.profile);
                        const confirmButton = (0, skydapp_browser_1.el)("a.confirm-soulink-button", "Confirm Soulink", {
                            click: async () => {
                                await SoulinkContract_1.default.setLink(await SoulinkContract_1.default.getTokenId(request.target), [
                                    request.signature,
                                    request.accept.signature,
                                ], [
                                    request.deadline,
                                    request.accept.deadline,
                                ]);
                                help.delete();
                                confirmButton.delete();
                                new Alert_1.default("The transaction has been registered. Please wait until it is finished.");
                            },
                        }).appendTo(this.profile);
                    }
                }
                else {
                    const result2 = await fetch(`${Config_1.default.apiURI}/request/${this.currentAddress}/${walletAddress}`);
                    const str2 = await result2.text();
                    if (str2 !== "") {
                        const help = (0, skydapp_browser_1.el)("p.help", "This person has already requested to be Soulinked with you.").appendTo(this.profile);
                        const acceptButton = (0, skydapp_browser_1.el)("a.accept-soulink-button", "Accept Soulink", {
                            click: async () => {
                                const deadline = Math.floor(Date.now() / 1000) + 315360000;
                                const signature = await Wallet_1.default.signTypedData(walletAddress, "Soulink", "1", SoulinkContract_1.default.address, "RequestLink", [
                                    { name: "to", type: "address" },
                                    { name: "deadline", type: "uint256" },
                                ], {
                                    to: this.currentAddress,
                                    deadline,
                                });
                                await fetch(`${Config_1.default.apiURI}/accept`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        requester: this.currentAddress,
                                        target: walletAddress,
                                        signature,
                                        deadline,
                                    }),
                                });
                                help.delete();
                                acceptButton.delete();
                                ignoreButton.delete();
                                new Alert_1.default("Soulink accepted.");
                            },
                        }).appendTo(this.profile);
                        const ignoreButton = (0, skydapp_browser_1.el)("a.ignore-soulink-button", "Ignore", {
                            click: async () => {
                                const signedMessage = await Wallet_1.default.signMessage("Ignore the request.");
                                const loading = new Loading_1.default("Ignoring...").appendTo(this.container);
                                await fetch(`${Config_1.default.apiURI}/ignore`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        signedMessage,
                                        requester: this.currentAddress,
                                        target: walletAddress,
                                    }),
                                });
                                loading.delete();
                                help.delete();
                                acceptButton.delete();
                                ignoreButton.delete();
                                new Alert_1.default("Ignored.");
                            },
                        }).appendTo(this.profile);
                    }
                    else {
                        const requestButton = (0, skydapp_browser_1.el)("a.request-soulink-button", "Request Soulink", {
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
                                requestButton.delete();
                                new Alert_1.default("Soulink requested.");
                            },
                        }).appendTo(this.profile);
                    }
                }
            }
            this.bookmarkButton.addClass("show");
            if (BookmarkManager_1.default.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
        }
        else {
            this.editButton.addClass("show");
        }
    }
    highlight(uri) {
        this.currentDot?.deleteClass("on");
        if (uri.indexOf("/") === -1) {
            this.currentDot = this.dots["links"];
        }
        else {
            uri = uri.substring(uri.indexOf("/") + 1);
            this.currentDot = this.dots[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentDot?.addClass("on");
    }
    changeParams(params, uri) {
        this.highlight(uri);
    }
    close() {
        BookmarkManager_1.default.off("bookmark", this.bookmarkHandler);
        BookmarkManager_1.default.off("unbookmark", this.unbookmarkHandler);
        this.container.delete();
        this.background.delete();
        super.close();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map