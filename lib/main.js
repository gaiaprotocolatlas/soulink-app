"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const Config_1 = __importDefault(require("./Config"));
const Wallet_1 = __importDefault(require("./network/Wallet"));
const AdminLayout_1 = __importDefault(require("./view/admin/AdminLayout"));
const AppearanceSetting_1 = __importDefault(require("./view/admin/AppearanceSetting"));
const BioLinksSetting_1 = __importDefault(require("./view/admin/BioLinksSetting"));
const SoulsSetting_1 = __importDefault(require("./view/admin/SoulsSetting"));
const BioLinks_1 = __importDefault(require("./view/BioLinks"));
const Bookmarks_1 = __importDefault(require("./view/Bookmarks"));
const BusinessCard_1 = __importDefault(require("./view/BusinessCard"));
const Galaxy_1 = __importDefault(require("./view/Galaxy"));
const Intro_1 = __importDefault(require("./view/Intro"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Mint_1 = __importDefault(require("./view/Mint"));
const MintFailed_1 = __importDefault(require("./view/MintFailed"));
const MintSuccess_1 = __importDefault(require("./view/MintSuccess"));
const NFTs_1 = __importDefault(require("./view/NFTs"));
const DiscountSetting_1 = __importDefault(require("./view/owner/DiscountSetting"));
const OwnerLayout_1 = __importDefault(require("./view/owner/OwnerLayout"));
const Souls_1 = __importDefault(require("./view/Souls"));
(async () => {
    if (sessionStorage.__spa_path) {
        skydapp_browser_1.SkyRouter.goNoHistory(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    skydapp_browser_1.SkyRouter.route("", Intro_1.default);
    skydapp_browser_1.SkyRouter.route("mint", Mint_1.default);
    skydapp_browser_1.SkyRouter.route("mint/success", MintSuccess_1.default);
    skydapp_browser_1.SkyRouter.route("mint/failed", MintFailed_1.default);
    skydapp_browser_1.SkyRouter.route(["galaxy", "galaxy/{addressOrEns}"], Galaxy_1.default);
    skydapp_browser_1.SkyRouter.route("bookmarks", Bookmarks_1.default);
    skydapp_browser_1.SkyRouter.route([
        "{addressOrEns}", "{addressOrEns}/links",
        "{addressOrEns}/nfts",
        "{addressOrEns}/souls",
        "{addressOrEns}/card",
    ], Layout_1.default, [
        "mint", "owner", "galaxy", "galaxy/{addressOrEns}", "bookmarks",
        "me", "my/links", "my/souls",
        "admin", "admin/links", "admin/souls",
    ]);
    skydapp_browser_1.SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks_1.default, [
        "mint", "owner", "galaxy", "galaxy/{addressOrEns}", "bookmarks",
        "me", "my/links",
        "admin", "admin/links",
    ]);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/nfts", NFTs_1.default);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/souls", Souls_1.default, ["my/souls", "admin/souls"]);
    skydapp_browser_1.SkyRouter.redirect("{addressOrEns}/soulmates", "{addressOrEns}/souls");
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/card", BusinessCard_1.default);
    skydapp_browser_1.SkyRouter.route([
        "me", "my/links",
        "my/nfts",
        "my/appearance",
        "my/souls",
    ], AdminLayout_1.default);
    skydapp_browser_1.SkyRouter.route(["me", "my/links"], BioLinksSetting_1.default);
    skydapp_browser_1.SkyRouter.route("my/appearance", AppearanceSetting_1.default);
    skydapp_browser_1.SkyRouter.route("my/souls", SoulsSetting_1.default);
    skydapp_browser_1.SkyRouter.redirect(["admin", "admin/links"], "me");
    skydapp_browser_1.SkyRouter.redirect("admin/appearance", "my/appearance");
    skydapp_browser_1.SkyRouter.redirect("admin/souls", "my/souls");
    skydapp_browser_1.SkyRouter.route([
        "owner", "owner/discount",
    ], OwnerLayout_1.default);
    skydapp_browser_1.SkyRouter.route(["owner", "owner/discount"], DiscountSetting_1.default);
    if (await Wallet_1.default.loadChainId() !== Config_1.default.chainId) {
        alert(`Wrong Network. Please change to ${Config_1.default.network}.`);
    }
    console.log("TEST!");
})();
//# sourceMappingURL=main.js.map