"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../components/Loading"));
const Config_1 = __importDefault(require("../Config"));
const DiscountDBContract_1 = __importDefault(require("../contracts/DiscountDBContract"));
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
const SoulinkMinterContract_1 = __importDefault(require("../contracts/SoulinkMinterContract"));
const ERC1155Contract_1 = __importDefault(require("../contracts/standards/ERC1155Contract"));
const ERC721Contract_1 = __importDefault(require("../contracts/standards/ERC721Contract"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
const Alert_1 = __importDefault(require("../popup/Alert"));
class Mint extends skydapp_common_1.View {
    constructor(params) {
        super();
        this.discountData = "0x";
        this.price = ethers_1.BigNumber.from(0);
        this.tansferHandler = async (from, to) => {
            if (from === "0x0000000000000000000000000000000000000000" && to === await Wallet_1.default.loadAddress()) {
                skydapp_browser_1.SkyRouter.go("/mint/success", undefined, true);
            }
        };
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".mint-view", (0, skydapp_browser_1.el)("header"), (0, skydapp_browser_1.el)("main", (0, skydapp_browser_1.el)("header", "S O U L I N K"), (0, skydapp_browser_1.el)("section", new skydapp_browser_1.ResponsiveImage("img", "/images/mint-image.png"), (0, skydapp_browser_1.el)("section", (0, skydapp_browser_1.el)("h1", (0, skydapp_browser_1.el)("b", "Let’s"), " Link!"), (0, skydapp_browser_1.el)(".stepper", (0, skydapp_browser_1.el)(".step", "Pre-launch Discount Period"), (0, skydapp_browser_1.el)(".step.on", "Public Sale"), (0, skydapp_browser_1.el)(".step", "LFG⚡️")), (0, skydapp_browser_1.el)(".info", (0, skydapp_browser_1.el)("p.quantity", "Quantity : MAX 1 per wallet : ", (0, skydapp_browser_1.el)("span", (0, skydapp_browser_1.el)("b", "1"))), (0, skydapp_browser_1.el)("p.price", "Price: ", (0, skydapp_browser_1.el)("span", this.priceDisplay = (0, skydapp_browser_1.el)("b", "..."), "eth"))), this.help = (0, skydapp_browser_1.el)("p.help"), (0, skydapp_browser_1.el)("a.mint", "Mint", {
            click: async () => {
                const loading = new Loading_1.default("Minting...").appendTo(this.container);
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const address = await Wallet_1.default.loadAddress();
                if (address !== undefined) {
                    if ((await NetworkProvider_1.default.getBalance(address)).lt(await SoulinkMinterContract_1.default.mintPrice())) {
                        new Alert_1.default("Not enough ETH to mint");
                        loading.delete();
                    }
                    else {
                        try {
                            await SoulinkMinterContract_1.default.mint(this.discountData === "0x", this.discountData, this.price);
                            loading.delete();
                        }
                        catch (error) {
                            console.error(error);
                            skydapp_browser_1.SkyRouter.go("/mint/failed", undefined, true);
                        }
                    }
                }
                else {
                    loading.delete();
                }
            },
        }), (0, skydapp_browser_1.el)("p", "Soulink is a soulbound token; this means that once you purchase it, you cannot transfer or sell it to another wallet address.")))), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/logo.png"), {
            click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true),
        }))));
        SoulinkContract_1.default.on("Transfer", this.tansferHandler);
        const check = async () => {
            const address = await Wallet_1.default.loadAddress();
            if (address !== undefined) {
                const balance = await SoulinkContract_1.default.balanceOf(address);
                if (balance.gt(0)) {
                    skydapp_browser_1.SkyRouter.go("/mint/success", undefined, true);
                }
            }
        };
        this.interval = setInterval(check, 15000);
        check();
        this.loadPrice();
    }
    async loadPrice() {
        let discountPercent = 0;
        let discountNFT;
        const user = await Wallet_1.default.loadAddress();
        if (user !== undefined) {
            const promises = [];
            for (const [address, type] of Object.entries(Config_1.default.discountNFTs)) {
                if (type === 1) {
                    promises.push((async () => {
                        const balance = await new ERC721Contract_1.default(address).balanceOf(user);
                        if (balance.gt(0)) {
                            this.discountData = utils_1.defaultAbiCoder.encode(["address"], [address]);
                            discountPercent = await DiscountDBContract_1.default.getDiscountRate(user, this.discountData);
                            discountNFT = address;
                        }
                    })());
                }
                else if (type === 2) {
                    promises.push((async () => {
                        const balance = await new ERC1155Contract_1.default(address).balanceOf(user, 0);
                        if (balance.gt(0)) {
                            this.discountData = utils_1.defaultAbiCoder.encode(["address", "uint256"], [address, 0]);
                            discountPercent = await DiscountDBContract_1.default.getDiscountRate(user, this.discountData);
                            discountNFT = address;
                        }
                    })());
                }
            }
            await Promise.all(promises);
        }
        this.price = await SoulinkMinterContract_1.default.mintPrice();
        if (this.closed !== true) {
            this.price = this.price.mul(10000 - discountPercent).div(10000);
            this.priceDisplay.empty().appendText(ethers_1.utils.formatEther(this.price));
            if (discountNFT !== undefined) {
                let name = "";
                if (discountNFT === "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb") {
                    name = "CryptoPunks";
                }
                if (discountNFT === "0xb48E526d935BEe3891222f6aC10A253e31CCaBE1") {
                    name = "Gaia Protocol";
                }
                if (discountNFT === "0xe7df0DcA32eb23F4182055dC6a2053A3fF239315") {
                    name = "Gaia Protocol";
                }
                if (discountNFT === "0xFfFd676Bffd8797f34C2Adc3E808F374CAEe49D8") {
                    name = "Gaia Protocol";
                }
                if (discountNFT === "0xa7298e98362625b65d08bb4c25992c503a0d48db") {
                    name = "The Koreans";
                }
                if (discountNFT === "0xDb63fFDc5FE6A6433dC503Fe33108f5057735058") {
                    name = "Project GMGN";
                }
                this.help.empty().appendText(`This discount is applied to you because you are own a(an) ${name}.`);
            }
        }
    }
    close() {
        SoulinkContract_1.default.off("Transfer", this.tansferHandler);
        clearInterval(this.interval);
        this.container.delete();
        super.close();
    }
}
exports.default = Mint;
//# sourceMappingURL=Mint.js.map