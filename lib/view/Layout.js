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
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Layout extends skydapp_common_1.View {
    constructor() {
        super();
        this.bio = { links: [] };
        Layout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".layout", (0, skydapp_browser_1.el)("header"), (0, skydapp_browser_1.el)("main", this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/bottom-logo.png"), {
            click: () => skydapp_browser_1.SkyRouter.go("/"),
        }), (0, skydapp_browser_1.el)(".sns", (0, skydapp_browser_1.el)("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }), (0, skydapp_browser_1.el)("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" })))));
    }
    async ready(addressOrEns, proc) {
        const loading = new Loading_1.default("Loading...").appendTo(skydapp_browser_1.BodyNode);
        const result = await fetch(`${Config_1.default.apiURI}/bio-cached/${addressOrEns}`);
        const str = await result.text();
        this.content.empty();
        this.profile.empty();
        if (str === "") {
            document.title = "Soulink | Page Not Found";
            this.content.append(new NotExistsDisplay_1.default());
        }
        else {
            document.title = `${addressOrEns.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;
            this.bio = JSON.parse(str);
            this.showLinkButton(addressOrEns);
            await proc();
        }
        loading.delete();
    }
    async showLinkButton(addressOrEns) {
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const address = await NetworkProvider_1.default.resolveName(addressOrEns);
            if (address !== walletAddress) {
                this.profile.append((0, skydapp_browser_1.el)("a", "Request Soulink", {
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
                    },
                }));
            }
        }
    }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map