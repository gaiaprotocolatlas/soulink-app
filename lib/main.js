"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const superagent_1 = __importDefault(require("superagent"));
const AdminLayout_1 = __importDefault(require("./view/admin/AdminLayout"));
const Analytics_1 = __importDefault(require("./view/admin/Analytics"));
const AppearanceSetting_1 = __importDefault(require("./view/admin/AppearanceSetting"));
const BioLinksSetting_1 = __importDefault(require("./view/admin/BioLinksSetting"));
const NFTsSetting_1 = __importDefault(require("./view/admin/NFTsSetting"));
const BioLinks_1 = __importDefault(require("./view/BioLinks"));
const Galaxy_1 = __importDefault(require("./view/Galaxy"));
const Intro_1 = __importDefault(require("./view/Intro"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Mint_1 = __importDefault(require("./view/Mint"));
const NFTs_1 = __importDefault(require("./view/NFTs"));
const DiscountSetting_1 = __importDefault(require("./view/owner/DiscountSetting"));
const OwnerLayout_1 = __importDefault(require("./view/owner/OwnerLayout"));
(async () => {
    if (sessionStorage.__spa_path) {
        skydapp_browser_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    skydapp_browser_1.msg.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skydapp_browser_1.SkyRouter.route("", Intro_1.default);
    skydapp_browser_1.SkyRouter.route("mint", Mint_1.default);
    skydapp_browser_1.SkyRouter.route([
        "{addressOrEns}", "{addressOrEns}/links",
        "{addressOrEns}/nfts",
        "{addressOrEns}/galaxy",
    ], Layout_1.default, ["mint", "admin", "admin/links", "owner"]);
    skydapp_browser_1.SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks_1.default, ["mint", "admin", "admin/links", "owner"]);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/nfts", NFTs_1.default);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/galaxy", Galaxy_1.default);
    skydapp_browser_1.SkyRouter.route([
        "admin", "admin/links",
        "admin/nfts",
        "admin/appearance",
        "admin/analytics",
    ], AdminLayout_1.default);
    skydapp_browser_1.SkyRouter.route(["admin", "admin/links"], BioLinksSetting_1.default);
    skydapp_browser_1.SkyRouter.route("admin/nfts", NFTsSetting_1.default);
    skydapp_browser_1.SkyRouter.route("admin/appearance", AppearanceSetting_1.default);
    skydapp_browser_1.SkyRouter.route("admin/analytics", Analytics_1.default);
    skydapp_browser_1.SkyRouter.route([
        "owner", "owner/discount",
    ], OwnerLayout_1.default);
    skydapp_browser_1.SkyRouter.route(["owner", "owner/discount"], DiscountSetting_1.default);
})();
//# sourceMappingURL=main.js.map