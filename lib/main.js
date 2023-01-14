import { SkyRouter } from "skydapp-browser";
import Home from "./view/Home.js";
import SoulView from "./view/SoulView.js";
(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.goNoHistory(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    SkyRouter.route("", Home);
    SkyRouter.route("{addressOrName}", SoulView);
})();
//# sourceMappingURL=main.js.map