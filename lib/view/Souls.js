"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../Config"));
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Utils_1 = __importDefault(require("../Utils"));
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
                let loading;
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".souls-view", this.soulList = (0, skydapp_browser_1.el)(".soul-list"), loading = (0, skydapp_browser_1.el)(".loading")));
                (async () => {
                    const address = await NetworkProvider_1.default.resolveName(addressOrEns);
                    const promises = [];
                    promises.push(this.loadRequestTo(address));
                    promises.push(this.loadRequestFrom(address));
                    await Promise.all(promises);
                    if (this.closed !== true) {
                        loading.delete();
                    }
                })();
            }
        });
    }
    async loadRequestTo(address) {
        const result = await fetch(`${Config_1.default.apiURI}/requestto/${address}`);
        const requests = await result.json();
        for (const request of requests) {
            const isLiked = await SoulinkContract_1.default.isLinked(await SoulinkContract_1.default.getTokenId(request.requester), await SoulinkContract_1.default.getTokenId(request.target));
            console.log("TEST!");
            if (isLiked === true) {
                const user = await Utils_1.default.loadUser(request.requester);
                if (this.closed !== true) {
                    (0, skydapp_browser_1.el)(".soul", user.pfpDisplay, (0, skydapp_browser_1.el)(".name", user.shortenName), { click: () => skydapp_browser_1.SkyRouter.go(`/${user.name}`, undefined, true) }).appendTo(this.soulList);
                }
            }
        }
    }
    async loadRequestFrom(address) {
        const result = await fetch(`${Config_1.default.apiURI}/requestfrom/${address}`);
        const requests = await result.json();
        for (const request of requests) {
            const isLiked = await SoulinkContract_1.default.isLinked(await SoulinkContract_1.default.getTokenId(request.requester), await SoulinkContract_1.default.getTokenId(request.target));
            console.log("TEST!");
            if (isLiked === true) {
                const user = await Utils_1.default.loadUser(request.target);
                if (this.closed !== true) {
                    (0, skydapp_browser_1.el)(".soul", user.pfpDisplay, (0, skydapp_browser_1.el)(".name", user.shortenName), { click: () => skydapp_browser_1.SkyRouter.go(`/${user.name}`, undefined, true) }).appendTo(this.soulList);
                }
            }
        }
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