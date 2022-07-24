import { msg, SkyRouter } from "skydapp-browser";
import superagent from "superagent";
import AdminLayout from "./view/admin/AdminLayout";
import Analytics from "./view/admin/Analytics";
import AppearanceSetting from "./view/admin/AppearanceSetting";
import BioLinksSetting from "./view/admin/BioLinksSetting";
import NFTsSetting from "./view/admin/NFTsSetting";
import BioLinks from "./view/BioLinks";
import Galaxy from "./view/Galaxy";
import Intro from "./view/Intro";
import Layout from "./view/Layout";
import Mint from "./view/Mint";
import NFTs from "./view/NFTs";
import DiscountSetting from "./view/owner/DiscountSetting";
import OwnerLayout from "./view/owner/OwnerLayout";

(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("", Intro);
    SkyRouter.route("mint", Mint);

    SkyRouter.route([
        "{addressOrEns}", "{addressOrEns}/links",
        "{addressOrEns}/nfts",
        "{addressOrEns}/galaxy",
    ], Layout, ["mint", "admin", "admin/links", "owner"]);

    SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks, ["mint", "admin", "admin/links", "owner"]);
    SkyRouter.route("{addressOrEns}/nfts", NFTs);
    SkyRouter.route("{addressOrEns}/galaxy", Galaxy);

    // admin
    SkyRouter.route([
        "admin", "admin/links",
        "admin/nfts",
        "admin/appearance",
        "admin/analytics",
    ], AdminLayout);

    SkyRouter.route(["admin", "admin/links"], BioLinksSetting);
    SkyRouter.route("admin/nfts", NFTsSetting);
    SkyRouter.route("admin/appearance", AppearanceSetting);
    SkyRouter.route("admin/analytics", Analytics);

    // owner
    SkyRouter.route([
        "owner", "owner/discount",
    ], OwnerLayout);

    SkyRouter.route(["owner", "owner/discount"], DiscountSetting);
})();
