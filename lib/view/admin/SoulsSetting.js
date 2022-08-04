"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../../components/Loading"));
const Config_1 = __importDefault(require("../../Config"));
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../../network/Wallet"));
const Alert_1 = __importDefault(require("../../popup/Alert"));
const Utils_1 = __importDefault(require("../../Utils"));
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class SoulsSetting extends skydapp_common_1.View {
    constructor() {
        super();
        this.load();
    }
    async load() {
        await AdminLayout_1.default.current.ready(async () => {
            if (this.closed !== true) {
                let loading;
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".souls-setting-view", this.toLinkContainer = (0, skydapp_browser_1.el)(".soul-list.to-link-container"), this.toAcceptContainer = (0, skydapp_browser_1.el)(".soul-list.to-accept-container"), this.linkedContainer = (0, skydapp_browser_1.el)(".soul-list.linked-container"), loading = (0, skydapp_browser_1.el)(".loading")));
                (async () => {
                    const promises = [];
                    promises.push(this.loadRequestTo());
                    promises.push(this.loadRequestFrom());
                    await Promise.all(promises);
                    loading.delete();
                })();
            }
        });
    }
    async loadRequestTo() {
        const result = await fetch(`${Config_1.default.apiURI}/requestto/${AdminLayout_1.default.current.address}`);
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
                const user = await Utils_1.default.loadUser(request.requester);
                (0, skydapp_browser_1.el)(".soul", (0, skydapp_browser_1.el)(".pfp", user.pfpDisplay, (0, skydapp_browser_1.el)(".name", user.shortenName), { click: () => skydapp_browser_1.SkyRouter.go(`/${user.name}`, undefined, true) }), (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-solid.fa-link-slash"), {
                    click: async () => {
                        await SoulinkContract_1.default.breakLink(await SoulinkContract_1.default.getTokenId(request.target));
                        new Alert_1.default("The transaction has been registered. Please wait until it is finished.");
                    },
                })).appendTo(this.linkedContainer);
            }
            else if (request.accept === undefined) {
                const user = await Utils_1.default.loadUser(request.requester);
                const requestDisplay = (0, skydapp_browser_1.el)(".soul", (0, skydapp_browser_1.el)(".pfp", user.pfpDisplay, (0, skydapp_browser_1.el)(".name", user.shortenName), { click: () => skydapp_browser_1.SkyRouter.go(`/${user.name}`, undefined, true) }), (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-solid.fa-check"), {
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
                        requestDisplay.delete();
                    },
                }), (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-solid.fa-xmark"), {
                    click: async () => {
                        const signedMessage = await Wallet_1.default.signMessage("Cancel the link request.");
                        const loading = new Loading_1.default("Canceling...").appendTo(skydapp_browser_1.BodyNode);
                        await fetch(`${Config_1.default.apiURI}/cancel`, {
                            method: "POST",
                            body: JSON.stringify({
                                signedMessage,
                                requester: request.requester,
                                target: AdminLayout_1.default.current.address,
                            }),
                        });
                        loading.delete();
                        requestDisplay.delete();
                    },
                })).appendTo(this.toAcceptContainer);
            }
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
                const user = await Utils_1.default.loadUser(request.target);
                (0, skydapp_browser_1.el)(".soul", (0, skydapp_browser_1.el)(".pfp", user.pfpDisplay, (0, skydapp_browser_1.el)(".name", user.shortenName), { click: () => skydapp_browser_1.SkyRouter.go(`/${user.name}`, undefined, true) }), (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-solid.fa-link-slash"), {
                    click: async () => {
                        await SoulinkContract_1.default.breakLink(await SoulinkContract_1.default.getTokenId(request.target));
                        new Alert_1.default("The transaction has been registered. Please wait until it is finished.");
                    },
                })).appendTo(this.linkedContainer);
            }
            else if (request.accept !== undefined) {
                const user = await Utils_1.default.loadUser(request.target);
                (0, skydapp_browser_1.el)(".soul", (0, skydapp_browser_1.el)(".pfp", user.pfpDisplay, (0, skydapp_browser_1.el)(".name", user.shortenName), { click: () => skydapp_browser_1.SkyRouter.go(`/${user.name}`, undefined, true) }), (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-solid.fa-link"), {
                    click: async () => {
                        await SoulinkContract_1.default.setLink(await SoulinkContract_1.default.getTokenId(request.target), [
                            request.signature,
                            request.accept.signature,
                        ], [
                            request.deadline,
                            request.accept.deadline,
                        ]);
                        new Alert_1.default("The transaction has been registered. Please wait until it is finished.");
                    },
                })).appendTo(this.toLinkContainer);
            }
        }
    }
    close() {
        this.container?.delete();
    }
}
exports.default = SoulsSetting;
//# sourceMappingURL=SoulsSetting.js.map