"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("../Contract"));
class SBTContract extends Contract_1.default {
    constructor(address, abi) {
        super(address, abi);
    }
    async name() {
        return await this.contract.name();
    }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
    async burn(tokenId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.burn(tokenId);
    }
}
exports.default = SBTContract;
//# sourceMappingURL=SBTContract.js.map