import { msg } from "skydapp-browser";
import { SkyRouter } from "skydapp-common";
import superagent from "superagent";
import Analytics from "./view/admin/Analytics";
import AppearanceSetting from "./view/admin/AppearanceSetting";
import BioLinksSetting from "./view/admin/BioLinksSetting";
import NFTsSetting from "./view/admin/NFTsSetting";
import BioLinks from "./view/BioLinks";
import Galaxy from "./view/Galaxy";
import Intro from "./view/Intro";
import Mint from "./view/Mint";
import NFTs from "./view/NFTs";
import DiscountSetting from "./view/owner/DiscountSetting";

(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("", Intro);
    SkyRouter.route("mint", Mint);

    SkyRouter.route(["{addressOrEns}", "{addressOrEns}/links"], BioLinks, ["mint", "admin", "admin/links", "owner"]);
    SkyRouter.route("{addressOrEns}/nfts", NFTs);
    SkyRouter.route("{addressOrEns}/galaxy", Galaxy);

    // admin
    SkyRouter.route(["admin", "admin/links"], BioLinksSetting);
    SkyRouter.route("admin/nfts", NFTsSetting);
    SkyRouter.route("admin/appearance", AppearanceSetting);
    SkyRouter.route("admin/analytics", Analytics);

    // owner
    SkyRouter.route(["owner", "owner/discount"], DiscountSetting);
})();
