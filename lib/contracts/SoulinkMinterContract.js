"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const SoulinkMinter_json_1 = __importDefault(require("./abi/soulink/artifacts/contracts/SoulinkMinter.sol/SoulinkMinter.json"));
const Contract_1 = __importDefault(require("./Contract"));
class SoulinkMinterContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.SoulinkMinter, SoulinkMinter_json_1.default.abi);
    }
    async mintPrice() {
        return await this.contract.mintPrice();
    }
    async mint(discount, data, price) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.mint(discount, data, { value: price });
    }
}
exports.default = new SoulinkMinterContract();
//# sourceMappingURL=SoulinkMinterContract.js.map