"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Soulink_json_1 = __importDefault(require("./abi/soulink/artifacts/contracts/Soulink.sol/Soulink.json"));
const SBTContract_1 = __importDefault(require("./standards/SBTContract"));
class SoulinkContract extends SBTContract_1.default {
    constructor() {
        super(Config_1.default.contracts.Soulink, Soulink_json_1.default.abi);
    }
    async getTokenId(owner) {
        return await this.contract.getTokenId(owner);
    }
    async isLinked(id0, id1) {
        return await this.contract.isLinked(id0, id1);
    }
    async setLink(targetId, sigs, deadlines) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.setLink(targetId, sigs, deadlines);
    }
    async breakLink(targetId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.breakLink(targetId);
    }
}
exports.default = new SoulinkContract();
//# sourceMappingURL=SoulinkContract.js.map