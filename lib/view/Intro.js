"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Alert_1 = __importDefault(require("../popup/Alert"));
class Intro extends skydapp_common_1.View {
    constructor() {
        super();
        skydapp_browser_1.BodyNode.append((0, skydapp_browser_1.el)(".intro-view", (0, skydapp_browser_1.el)("header"), (0, skydapp_browser_1.el)("main", (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("h2", "Link your web3's"), (0, skydapp_browser_1.el)("h1", "Soul"), new skydapp_browser_1.ResponsiveImage("img", "/images/intro-image.png")), (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("p", "It all started when ", (0, skydapp_browser_1.el)("b", "BTC"), " became the new gold.\n", (0, skydapp_browser_1.el)("b", "ETH"), " became the new cash.\n", (0, skydapp_browser_1.el)("b", "DeFi"), " is replacing banks.\n", (0, skydapp_browser_1.el)("b", "NFT"), "s have become a means of storing value.\n", (0, skydapp_browser_1.el)("b", "PFP"), "s replaced our faces.\n", "And now, thanks to ", (0, skydapp_browser_1.el)("b", "SBT"), "s,\n", "“", (0, skydapp_browser_1.el)("strong", "Soulink"), "” will be synonymous to “", (0, skydapp_browser_1.el)("b", "connect"), "”.\n", "Welcome to web 3."), (0, skydapp_browser_1.el)("h6.mobile", (0, skydapp_browser_1.el)("b", "Let’s"), " Link!"), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("b", "Mint"), " Soulink", {
            click: () => new Alert_1.default("Soulink will be released soon."),
        }), (0, skydapp_browser_1.el)("a", "Admin", {
            click: () => new Alert_1.default("Soulink will be released soon."),
        })), (0, skydapp_browser_1.el)("h6.no-mobile", (0, skydapp_browser_1.el)("b", "Let’s"), " Link!"))), (0, skydapp_browser_1.el)("footer", new skydapp_browser_1.ResponsiveImage("img", "/images/bottom-logo.png"), (0, skydapp_browser_1.el)(".sns", (0, skydapp_browser_1.el)("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }), (0, skydapp_browser_1.el)("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" })))));
    }
}
exports.default = Intro;
//# sourceMappingURL=Intro.js.map