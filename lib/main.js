"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const superagent_1 = __importDefault(require("superagent"));
const AdminLayout_1 = __importDefault(require("./view/admin/AdminLayout"));
const AppearanceSetting_1 = __importDefault(require("./view/admin/AppearanceSetting"));
const BioLinksSetting_1 = __importDefault(require("./view/admin/BioLinksSetting"));
const SoulsSetting_1 = __importDefault(require("./view/admin/SoulsSetting"));
const BioLinks_1 = __importDefault(require("./view/BioLinks"));
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
        skydapp_browser_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    skydapp_browser_1.msg.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skydapp_browser_1.SkyRouter.route("", Intro_1.default);
    skydapp_browser_1.SkyRouter.route("mint", Mint_1.default);
    skydapp_browser_1.SkyRouter.route("mint/success", MintSuccess_1.default);
    skydapp_browser_1.SkyRouter.route("mint/failed", MintFailed_1.default);
    skydapp_browser_1.SkyRouter.route("galaxy", Galaxy_1.default);
    skydapp_browser_1.SkyRouter.route([
        "{addressOrEns}", "{addressOrEns}/links",
        "{addressOrEns}/nfts",
        "{addressOrEns}/souls",
        "{addressOrEns}/card",
    ], Layout_1.default, ["mint", "admin", "admin/links", "admin/souls", "owner", "galaxy"]);
    skydapp_browser_1.SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks_1.default, ["mint", "admin", "admin/links", "owner", "galaxy"]);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/nfts", NFTs_1.default);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/souls", Souls_1.default, ["admin/souls"]);
    skydapp_browser_1.SkyRouter.route("{addressOrEns}/card", BusinessCard_1.default);
    skydapp_browser_1.SkyRouter.route([
        "admin", "admin/links",
        "admin/nfts",
        "admin/appearance",
        "admin/souls",
    ], AdminLayout_1.default);
    skydapp_browser_1.SkyRouter.route(["admin", "admin/links"], BioLinksSetting_1.default);
    skydapp_browser_1.SkyRouter.route("admin/appearance", AppearanceSetting_1.default);
    skydapp_browser_1.SkyRouter.route("admin/souls", SoulsSetting_1.default);
    skydapp_browser_1.SkyRouter.route([
        "owner", "owner/discount",
    ], OwnerLayout_1.default);
    skydapp_browser_1.SkyRouter.route(["owner", "owner/discount"], DiscountSetting_1.default);
})();
//# sourceMappingURL=main.js.map