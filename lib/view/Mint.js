"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../components/Loading"));
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const SoulinkMinterContract_1 = __importDefault(require("../contracts/SoulinkMinterContract"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Mint extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".mint-view", (0, skydapp_browser_1.el)("header"), (0, skydapp_browser_1.el)("main", (0, skydapp_browser_1.el)("header", "S O U L I N K"), (0, skydapp_browser_1.el)("section", new skydapp_browser_1.ResponsiveImage("img", "/images/mint-image.png"), (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("h1", (0, skydapp_browser_1.el)("b", "Let’s"), " Link!"), (0, skydapp_browser_1.el)(".stepper", (0, skydapp_browser_1.el)(".step.on", "Pre-launch Discount Period"), (0, skydapp_browser_1.el)(".step", "Public Sale"), (0, skydapp_browser_1.el)(".step", "LFG⚡️")), (0, skydapp_browser_1.el)(".info", (0, skydapp_browser_1.el)("p.quantity", "Quantity : MAX 1 per wallet : ", (0, skydapp_browser_1.el)("span", (0, skydapp_browser_1.el)("b", "1"))), (0, skydapp_browser_1.el)("p.price", "Price: ", (0, skydapp_browser_1.el)("span", this.priceDisplay = (0, skydapp_browser_1.el)("b", "..."), "eth"))), (0, skydapp_browser_1.el)("a.mint", "Mint", {
            click: async () => {
                try {
                    new Loading_1.default("Minting...").appendTo(this.container);
                    await SoulinkMinterContract_1.default.mint(false, "0x");
                }
                catch (error) {
                    console.error(error);
                    skydapp_browser_1.SkyRouter.go("/mint/failed", undefined, true);
                }
            },
        }), (0, skydapp_browser_1.el)("p", "It is designed with an SBT token, so once you buy it, you cannot sell is back. It is attached to your crypto wallet.")))), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/logo.png"), {
            click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true),
        }))));
        SoulinkContract_1.default.on("Transfer", async (from, to) => {
            if (from === "0x0000000000000000000000000000000000000000" && to === await Wallet_1.default.loadAddress()) {
                skydapp_browser_1.SkyRouter.go("/mint/success", undefined, true);
            }
        });
        this.loadPrice();
    }
    async loadPrice() {
        const price = await SoulinkMinterContract_1.default.mintPrice();
        this.priceDisplay.empty().appendText(ethers_1.utils.formatEther(price));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
exports.default = Mint;
//# sourceMappingURL=Mint.js.map