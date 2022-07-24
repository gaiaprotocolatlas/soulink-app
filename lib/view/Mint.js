"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const SoulinkMinterContract_1 = __importDefault(require("../contracts/SoulinkMinterContract"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Mint extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".mint-view", (0, skydapp_browser_1.el)("a", "Mint", {
            click: async () => {
                await SoulinkMinterContract_1.default.mint(false, "0x");
            },
        }), (0, skydapp_browser_1.el)("a", "Burn", {
            click: async () => {
                const address = await Wallet_1.default.loadAddress();
                if (address !== undefined) {
                    await SoulinkContract_1.default.burn(await SoulinkContract_1.default.getTokenId(address));
                }
            },
        })));
        SoulinkContract_1.default.on("Transfer", async (from, to) => {
            if (from === "0x0000000000000000000000000000000000000000" && to === await Wallet_1.default.loadAddress()) {
                skydapp_browser_1.SkyRouter.go("/admin", undefined, true);
            }
        });
    }
    close() {
        this.container.delete();
    }
}
exports.default = Mint;
//# sourceMappingURL=Mint.js.map