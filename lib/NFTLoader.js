"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("./Config"));
class NFTLoader {
    constructor() {
        this.nfts = {};
        this.continuations = {};
    }
    async load(address) {
        if (this.nfts[address] === undefined) {
            const result = await fetch(`${Config_1.default.apiURI}/nfts/${address}`);
            const data = await result.json();
            this.nfts[address] = data.nfts;
            if (data.continuation !== null) {
                this.continuations[address] = data.continuation;
            }
        }
        return this.nfts[address];
    }
    async loadMore(address) {
        if (this.continuations[address] !== undefined) {
            const result = await fetch(`${Config_1.default.apiURI}/nfts/${address}?continuation=${this.continuations[address]}`);
            const data = await result.json();
            this.nfts[address] = [...this.nfts[address], ...data.nfts];
            if (data.continuation === null) {
                delete this.continuations[address];
            }
            else {
                this.continuations[address] = data.continuation;
            }
            return data.nfts;
        }
        return [];
    }
}
exports.default = new NFTLoader();
//# sourceMappingURL=NFTLoader.js.map