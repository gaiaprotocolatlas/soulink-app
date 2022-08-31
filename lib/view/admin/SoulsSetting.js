"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../../components/Loading"));
const SoulDisplay_1 = __importDefault(require("../../components/SoulDisplay"));
const Config_1 = __importDefault(require("../../Config"));
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../../network/Wallet"));
const Alert_1 = __importDefault(require("../../popup/Alert"));
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
                    const linked = await this.loadLinked();
                    await this.loadRequest(linked);
                    loading.delete();
                })();
            }
        });
    }
    async loadLinked() {
        const result = await fetch(`${Config_1.default.apiURI}/linked/${AdminLayout_1.default.current.address}`);
        const bios = await result.json();
        for (const bio of bios) {
            new SoulDisplay_1.default(bio, AdminLayout_1.default.current.bio.color, (0, skydapp_browser_1.el)("a.unlink", (0, skydapp_browser_1.el)("i.fa-light.fa-link-slash"), {
                click: async () => {
                    if (AdminLayout_1.default.current.address !== await Wallet_1.default.loadAddress()) {
                        new Alert_1.default(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout_1.default.current.address} to continue.`);
                    }
                    else {
                        await SoulinkContract_1.default.breakLink(await SoulinkContract_1.default.getTokenId(bio.id));
                        new Alert_1.default("The transaction has been registered. Please wait until it is finished.");
                    }
                },
            })).appendTo(this.linkedContainer);
        }
        return bios;
    }
    async loadRequest(linked) {
        const result = await fetch(`${Config_1.default.apiURI}/request/${AdminLayout_1.default.current.address}`);
        const requests = await result.json();
        for (const request of requests) {
            if (request.accept === undefined &&
                request.requester !== AdminLayout_1.default.current.address &&
                linked.find((l) => l.id === request.requester) === undefined) {
                const requestDisplay = new SoulDisplay_1.default(request.bio ?? { id: request.requester, links: [] }, AdminLayout_1.default.current.bio.color, (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-light.fa-check"), {
                    click: async () => {
                        if (AdminLayout_1.default.current.address !== await Wallet_1.default.loadAddress()) {
                            new Alert_1.default(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout_1.default.current.address} to continue.`);
                        }
                        else {
                            const deadline = Math.floor(Date.now() / 1000) + 315360000;
                            const signature = await Wallet_1.default.signTypedData(AdminLayout_1.default.current.address, "Soulink", "1", SoulinkContract_1.default.address, "RequestLink", [
                                { name: "targetId", type: "uint256" },
                                { name: "deadline", type: "uint256" },
                            ], {
                                targetId: ethers_1.BigNumber.from(request.requester),
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
                            new Alert_1.default("Soulink accepted.");
                        }
                    },
                }), (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-light.fa-xmark"), {
                    click: async () => {
                        if (AdminLayout_1.default.current.address !== await Wallet_1.default.loadAddress()) {
                            new Alert_1.default(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout_1.default.current.address} to continue.`);
                        }
                        else {
                            const signedMessage = await Wallet_1.default.signMessage("Ignore the request.");
                            const loading = new Loading_1.default("Ignoring...").appendTo(this.container);
                            await fetch(`${Config_1.default.apiURI}/ignore`, {
                                method: "POST",
                                body: JSON.stringify({
                                    signedMessage,
                                    requester: request.requester,
                                    target: AdminLayout_1.default.current.address,
                                }),
                            });
                            loading.delete();
                            requestDisplay.delete();
                            new Alert_1.default("Ignored.");
                        }
                    },
                })).appendTo(this.toAcceptContainer);
            }
            else if (request.accept !== undefined &&
                request.requester === AdminLayout_1.default.current.address &&
                linked.find((l) => l.id === request.target) === undefined) {
                const soulDisplay = new SoulDisplay_1.default(request.bio ?? { id: request.target, links: [] }, AdminLayout_1.default.current.bio.color, (0, skydapp_browser_1.el)("a.link", (0, skydapp_browser_1.el)("i.fa-light.fa-link"), {
                    click: async () => {
                        if (AdminLayout_1.default.current.address !== await Wallet_1.default.loadAddress()) {
                            new Alert_1.default(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout_1.default.current.address} to continue.`);
                        }
                        else {
                            await SoulinkContract_1.default.setLink(await SoulinkContract_1.default.getTokenId(request.target), [
                                request.signature,
                                request.accept.signature,
                            ], [
                                request.deadline,
                                request.accept.deadline,
                            ]);
                            soulDisplay.delete();
                            new Alert_1.default("The transaction has been registered. Please wait until it is finished.");
                        }
                    },
                })).appendTo(this.toLinkContainer);
            }
        }
        if (this.toLinkContainer?.children.length === 0 &&
            this.toAcceptContainer?.children.length === 0 &&
            this.linkedContainer?.children.length === 0) {
            this.container?.append((0, skydapp_browser_1.el)("p.empty", "This Soul isn’t Soulinked with anyone yet."));
        }
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
exports.default = SoulsSetting;
//# sourceMappingURL=SoulsSetting.js.map