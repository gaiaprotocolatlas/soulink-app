"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../../Config"));
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../../network/Wallet"));
class AdminLayout extends skydapp_common_1.View {
    constructor() {
        super();
        this.address = ethers_1.constants.AddressZero;
        this.bio = { links: [] };
        AdminLayout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".admin-layout", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("a", "Links", { click: () => { skydapp_browser_1.SkyRouter.go("/admin", undefined, true); } }), (0, skydapp_browser_1.el)("a", "Appearance", { click: () => { skydapp_browser_1.SkyRouter.go("/admin/appearance", undefined, true); } }), (0, skydapp_browser_1.el)("a", "Save", { click: () => this.save() })), this.content = (0, skydapp_browser_1.el)(".content")));
        document.title = "Soulink Admin";
    }
    async ready() {
        if (this.address !== ethers_1.constants.AddressZero) {
            return true;
        }
        else {
            let address = await Wallet_1.default.loadAddress();
            if (address === undefined) {
                await Wallet_1.default.connect();
                address = await Wallet_1.default.loadAddress();
            }
            if (address === undefined) {
                this.content.empty().append((0, skydapp_browser_1.el)("p", "Not connected to wallet."));
                return false;
            }
            else {
                const balance = await SoulinkContract_1.default.balanceOf(AdminLayout.current.address);
                if (balance.eq(0)) {
                    skydapp_browser_1.SkyRouter.go("/mint", undefined, true);
                    return false;
                }
                else {
                    const result = await fetch(`${Config_1.default.apiURI}/bio/${address}`);
                    const str = await result.text();
                    this.bio = str === "" ? { links: [] } : JSON.parse(str);
                    this.address = address;
                    return true;
                }
            }
        }
    }
    async save() {
        const signedMessage = await Wallet_1.default.signMessage("Save your changes.");
        await fetch(`${Config_1.default.apiURI}/bio`, {
            method: "POST",
            body: JSON.stringify({ signedMessage, bio: this.bio }),
        });
    }
    close() {
        this.container.delete();
    }
}
exports.default = AdminLayout;
//# sourceMappingURL=AdminLayout.js.map