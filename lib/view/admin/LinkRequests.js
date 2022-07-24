"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../../Config"));
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../../network/Wallet"));
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class LinkRequests extends skydapp_common_1.View {
    constructor() {
        super();
        this.load();
    }
    async load() {
        if (await AdminLayout_1.default.current.ready() === true) {
            if (this.closed !== true) {
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".container", this.requestToContainer = (0, skydapp_browser_1.el)(".request-to-container"), this.requestFromContainer = (0, skydapp_browser_1.el)(".request-from-container")));
                this.loadRequestTo();
                this.loadRequestFrom();
            }
        }
    }
    async loadRequestTo() {
        const result = await fetch(`${Config_1.default.apiURI}/requestto/${AdminLayout_1.default.current.address}`);
        const requests = await result.json();
        for (const request of requests) {
            (0, skydapp_browser_1.el)(".request", (0, skydapp_browser_1.el)("", request.requester), (0, skydapp_browser_1.el)("a", "Accept", {
                click: async () => {
                    const deadline = Math.floor(Date.now() / 1000) + 315360000;
                    const signature = await Wallet_1.default.signTypedData(AdminLayout_1.default.current.address, "Soulink", "1", SoulinkContract_1.default.address, "RequestLink", [
                        { name: "to", type: "address" },
                        { name: "deadline", type: "uint256" },
                    ], {
                        to: request.requester,
                        deadline,
                    });
                    await fetch(`${Config_1.default.apiURI}/accept`, {
                        method: "POST",
                        body: JSON.stringify({
                            requester: request.requester,
                            target: AdminLayout_1.default.current.address,
                            signature,
                            deadline,
                        }),
                    });
                },
            })).appendTo(this.requestToContainer);
        }
    }
    async loadRequestFrom() {
        const result = await fetch(`${Config_1.default.apiURI}/requestfrom/${AdminLayout_1.default.current.address}`);
        const requests = await result.json();
        for (const request of requests) {
            const isLiked = await SoulinkContract_1.default.isLinked(await SoulinkContract_1.default.getTokenId(request.requester), await SoulinkContract_1.default.getTokenId(request.target));
            if (isLiked === true) {
                fetch(`${Config_1.default.apiURI}/removelinked`, {
                    method: "POST",
                    body: JSON.stringify({
                        requester: request.requester,
                        target: request.target,
                    }),
                });
            }
            else {
                (0, skydapp_browser_1.el)(".request", (0, skydapp_browser_1.el)("", request.requester), request.accept === undefined ? undefined : (0, skydapp_browser_1.el)("a", "Link Soul", {
                    click: async () => {
                        await SoulinkContract_1.default.setLink(await SoulinkContract_1.default.getTokenId(request.target), [
                            request.signature,
                            request.accept.signature,
                        ], [
                            request.deadline,
                            request.accept.deadline,
                        ]);
                    },
                })).appendTo(this.requestToContainer);
            }
        }
    }
    close() {
        this.container?.delete();
    }
}
exports.default = LinkRequests;
//# sourceMappingURL=LinkRequests.js.map