"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const SoulDisplay_1 = __importDefault(require("../components/SoulDisplay"));
const Config_1 = __importDefault(require("../Config"));
const Layout_1 = __importDefault(require("./Layout"));
class Souls extends skydapp_common_1.View {
    constructor(params) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout_1.default.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                let galaxy;
                let loading;
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".souls-view", galaxy = (0, skydapp_browser_1.el)(".galaxy", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/user-galaxy.png"), "View in Galaxy", {
                    click: () => skydapp_browser_1.SkyRouter.go(`/galaxy/${addressOrEns}`, undefined, true),
                })), this.soulList = (0, skydapp_browser_1.el)(".soul-list"), loading = (0, skydapp_browser_1.el)(".loading")));
                galaxy.style({ color: Layout_1.default.current.bio.color });
                (async () => {
                    const result = await fetch(`${Config_1.default.apiURI}/linked/${Layout_1.default.current.currentAddress}`);
                    const linked = await result.json();
                    if (linked.length === 0) {
                        this.container?.append((0, skydapp_browser_1.el)("p.empty", "This Soul isn’t Soulinked with anyone yet."));
                    }
                    for (const bio of linked) {
                        new SoulDisplay_1.default(bio, Layout_1.default.current.bio.color).appendTo(this.soulList);
                    }
                    if (this.closed !== true) {
                        loading.delete();
                    }
                })();
            }
        });
    }
    changeParams(params, uri) {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
exports.default = Souls;
//# sourceMappingURL=Souls.js.map