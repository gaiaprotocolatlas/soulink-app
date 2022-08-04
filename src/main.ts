import { msg, SkyRouter } from "skydapp-browser";
import superagent from "superagent";
import AdminLayout from "./view/admin/AdminLayout";
import AppearanceSetting from "./view/admin/AppearanceSetting";
import BioLinksSetting from "./view/admin/BioLinksSetting";
import SoulsSetting from "./view/admin/SoulsSetting";
import BioLinks from "./view/BioLinks";
import BusinessCard from "./view/BusinessCard";
import Intro from "./view/Intro";
import Layout from "./view/Layout";
import Mint from "./view/Mint";
import MintFailed from "./view/MintFailed";
import MintSuccess from "./view/MintSuccess";
import NFTs from "./view/NFTs";
import DiscountSetting from "./view/owner/DiscountSetting";
import OwnerLayout from "./view/owner/OwnerLayout";
import Souls from "./view/Souls";

(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("", Intro);
    SkyRouter.route("mint", Mint);
    SkyRouter.route("mint/success", MintSuccess);
    SkyRouter.route("mint/failed", MintFailed);

    SkyRouter.route([
        "{addressOrEns}", "{addressOrEns}/links",
        "{addressOrEns}/nfts",
        "{addressOrEns}/souls",
        "{addressOrEns}/card",
    ], Layout, ["mint", "admin", "admin/links", "admin/souls", "owner"]);

    SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks, ["mint", "admin", "admin/links", "owner"]);
    SkyRouter.route("{addressOrEns}/nfts", NFTs);
    SkyRouter.route("{addressOrEns}/souls", Souls, ["admin/souls"]);
    SkyRouter.route("{addressOrEns}/card", BusinessCard);

    // admin
    SkyRouter.route([
        "admin", "admin/links",
        "admin/nfts",
        "admin/appearance",
        "admin/souls",
    ], AdminLayout);

    SkyRouter.route(["admin", "admin/links"], BioLinksSetting);
    SkyRouter.route("admin/appearance", AppearanceSetting);
    SkyRouter.route("admin/souls", SoulsSetting);

    // owner
    SkyRouter.route([
        "owner", "owner/discount",
    ], OwnerLayout);

    SkyRouter.route(["owner", "owner/discount"], DiscountSetting);
})();
