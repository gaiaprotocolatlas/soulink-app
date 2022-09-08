"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const SoulinkSignatureChecker_json_1 = __importDefault(require("./abi/soulink/artifacts/contracts/SoulinkSignatureChecker.sol/SoulinkSignatureChecker.json"));
const Contract_1 = __importDefault(require("./Contract"));
class SoulinkSignatureCheckerContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.SoulinkSignatureChecker, SoulinkSignatureChecker_json_1.default.abi);
    }
    async checkSignature(from, toId, fromDeadline, fromSig) {
        await this.contract.checkSignature(from, toId, fromDeadline, fromSig);
    }
}
exports.default = new SoulinkSignatureCheckerContract();
//# sourceMappingURL=SoulinkSignatureCheckerContract.js.map