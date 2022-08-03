"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Burn extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".burn-view", (0, skydapp_browser_1.el)("a", "Burn", {
            click: async () => {
                const address = await Wallet_1.default.loadAddress();
                if (address !== undefined) {
                    await SoulinkContract_1.default.burn(await SoulinkContract_1.default.getTokenId(address));
                }
            },
        })));
    }
    close() {
        this.container.delete();
    }
}
exports.default = Burn;
//# sourceMappingURL=Burn.js.map