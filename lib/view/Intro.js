"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const BookmarkManager_1 = __importDefault(require("../BookmarkManager"));
const SoulDisplay_1 = __importDefault(require("../components/SoulDisplay"));
const Config_1 = __importDefault(require("../Config"));
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Intro extends skydapp_common_1.View {
    constructor() {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".intro-view", (0, skydapp_browser_1.el)("header"), (0, skydapp_browser_1.el)("main", this.bookmarkList = (0, skydapp_browser_1.el)(".bookmark-list"), (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("h2", "Link your web3's"), (0, skydapp_browser_1.el)("h1", "Soul"), new skydapp_browser_1.ResponsiveImage("img", "/images/intro-image.png")), (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("p", "It all started when ", (0, skydapp_browser_1.el)("b", "BTC"), " became the new gold.\n", (0, skydapp_browser_1.el)("b", "ETH"), " became the new cash.\n", (0, skydapp_browser_1.el)("b", "DeFi"), " is replacing banks.\n", (0, skydapp_browser_1.el)("b", "NFT"), "s have become a means of storing value.\n", (0, skydapp_browser_1.el)("b", "PFP"), "s replaced our faces.\n", "And now, thanks to ", (0, skydapp_browser_1.el)("b", "SBT"), "s,\n", "“", (0, skydapp_browser_1.el)("strong", "Soulink"), "” will be synonymous to “", (0, skydapp_browser_1.el)("b", "connect"), "”.\n", "Welcome to web 3."), (0, skydapp_browser_1.el)("h6.mobile", (0, skydapp_browser_1.el)("b", "Let’s"), " Link!"), (0, skydapp_browser_1.el)(".button-container", this.mintButton = (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("b", "Mint"), " Soulink", {
            click: () => skydapp_browser_1.SkyRouter.go("/mint", undefined, true),
        }), this.adminButton = (0, skydapp_browser_1.el)("a", "Admin", {
            click: () => skydapp_browser_1.SkyRouter.go("/admin", undefined, true),
        })), (0, skydapp_browser_1.el)("h6.no-mobile", (0, skydapp_browser_1.el)("b", "Let’s"), " Link!")))), (0, skydapp_browser_1.el)("footer", new skydapp_browser_1.ResponsiveImage("img", "/images/bottom-logo.png"), (0, skydapp_browser_1.el)(".sns", (0, skydapp_browser_1.el)("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }), (0, skydapp_browser_1.el)("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" })))));
        this.check();
        this.loadBookmarks();
    }
    async check() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = await SoulinkContract_1.default.balanceOf(address);
            if (balance.gt(0)) {
                this.mintButton.delete();
            }
            else {
                this.adminButton.delete();
            }
        }
    }
    async loadBookmarks() {
        if (BookmarkManager_1.default.all.length > 0) {
            this.bookmarkList.append((0, skydapp_browser_1.el)("h1", (0, skydapp_browser_1.el)("i.fa-solid.fa-star")));
            const result = await fetch(`${Config_1.default.apiURI}/bios?addresses=${JSON.stringify(BookmarkManager_1.default.all)}`);
            const bios = await result.json();
            for (const bio of bios) {
                const bookmark = new SoulDisplay_1.default(bio, undefined, (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-solid.fa-xmark"), {
                    click: async () => {
                        BookmarkManager_1.default.unbookmark(bio.id);
                        bookmark.delete();
                    },
                })).appendTo(this.bookmarkList);
            }
        }
    }
    close() {
        this.container.delete();
        super.close();
    }
}
exports.default = Intro;
//# sourceMappingURL=Intro.js.map