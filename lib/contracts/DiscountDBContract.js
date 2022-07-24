"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const DiscountDBV0_json_1 = __importDefault(require("./abi/soulink/artifacts/contracts/DiscountDB.sol/DiscountDBV0.json"));
const Contract_1 = __importDefault(require("./Contract"));
class DiscountDBContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.DiscountDB, DiscountDBV0_json_1.default.abi);
    }
}
exports.default = new DiscountDBContract();
//# sourceMappingURL=DiscountDBContract.js.map