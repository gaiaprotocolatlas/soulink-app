"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../Config"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../network/Wallet"));
class Contract extends skydapp_common_1.EventContainer {
    constructor(address, abi) {
        super();
        this.address = address;
        this.abi = abi;
        this.contract = new ethers_1.ethers.Contract(address, abi, NetworkProvider_1.default.provider).connect(NetworkProvider_1.default.signer);
        for (const part of abi) {
            if (part.type === "event") {
                this.contract.on(part.name, (...args) => {
                    this.fireEvent(part.name, ...args);
                });
            }
        }
        Wallet_1.default.on("chainChanged", () => this.walletContract = undefined);
    }
    get interface() {
        return this.contract.interface;
    }
    async getWalletContract() {
        if (await Wallet_1.default.connected() === true) {
            if (this.walletContract === undefined && Wallet_1.default.signer !== undefined) {
                this.walletContract = new ethers_1.ethers.Contract(this.address, this.abi, Wallet_1.default.provider).connect(Wallet_1.default.signer);
            }
            return this.walletContract;
        }
    }
    async connectAndGetWalletContract() {
        if (await Wallet_1.default.loadChainId() !== Config_1.default.chainId) {
            alert(`Wrong Network. Please change to ${Config_1.default.network}.`);
            Wallet_1.default.disconnectFromWalletConnect();
        }
        else {
            if (await Wallet_1.default.connected() !== true) {
                await Wallet_1.default.connect();
            }
            if (this.walletContract === undefined && Wallet_1.default.signer !== undefined) {
                this.walletContract = new ethers_1.ethers.Contract(this.address, this.abi, Wallet_1.default.provider).connect(Wallet_1.default.signer);
            }
            return this.walletContract;
        }
    }
}
exports.default = Contract;
//# sourceMappingURL=Contract.js.map