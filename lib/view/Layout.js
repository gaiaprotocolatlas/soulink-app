"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const NotExistsDisplay_1 = __importDefault(require("../components/NotExistsDisplay"));
const Config_1 = __importDefault(require("../Config"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Layout extends skydapp_common_1.View {
    constructor() {
        super();
        this.bio = { links: [] };
        Layout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".layout", this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")));
    }
    async ready(addressOrEns) {
        const result = await fetch(`${Config_1.default.apiURI}/bio/${addressOrEns}`);
        const str = await result.text();
        this.content.empty();
        this.profile.empty();
        if (str === "") {
            document.title = "Soulink | Page Not Found";
            this.content.append(new NotExistsDisplay_1.default());
            return false;
        }
        else {
            document.title = `${addressOrEns.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;
            this.bio = JSON.parse(str);
            this.showLinkButton(addressOrEns);
            return true;
        }
    }
    async showLinkButton(addressOrEns) {
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const address = await NetworkProvider_1.default.resolveName(addressOrEns);
            if (address !== walletAddress) {
                this.profile.append((0, skydapp_browser_1.el)("a", "Request Soulink", {
                    click: () => {
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