"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SoulinkContract_1 = __importDefault(require("../contracts/SoulinkContract"));
class Intro {
    constructor() {
        this.load();
    }
    async load() {
        console.log(await SoulinkContract_1.default.name());
    }
    changeParams(params, uri) {
    }
    close() {
    }
}
exports.default = Intro;
//# sourceMappingURL=Intro%20copy.js.map