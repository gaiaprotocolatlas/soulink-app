"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ERC721_json_1 = __importDefault(require("../abi/standards/artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json"));
const Contract_1 = __importDefault(require("../Contract"));
class ERC721Contract extends Contract_1.default {
    constructor(address, abi) {
        super(address, abi ?? ERC721_json_1.default.abi);
    }
    async getName() {
        return await this.contract.name();
    }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
    async ownerOf(id) {
        return await this.contract.ownerOf(id);
    }
    async getNonce(id) {
        return await this.contract.nonces(id);
    }
    async getNonceForAll(owner) {
        return await this.contract.noncesForAll(owner);
    }
    async isApprovedForAll(owner, operator) {
        return await this.contract.isApprovedForAll(owner, operator);
    }
    async transferFrom(from, to, tokenId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.transferFrom(from, to, tokenId);
    }
}
exports.default = ERC721Contract;
//# sourceMappingURL=ERC721Contract.js.map