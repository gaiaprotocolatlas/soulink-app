"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
class BioLinks {
    constructor(params) {
        this.load(params.addressOrEns);
    }
    async load(addressOrEns) {
        const address = await NetworkProvider_1.default.resolveName(addressOrEns);
        console.log(address);
    }
    changeParams(params, uri) {
        this.load(params.addressOrEns);
    }
    close() {
    }
}
exports.default = BioLinks;
//# sourceMappingURL=BioLinks.js.map