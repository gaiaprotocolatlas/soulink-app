"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("./Config"));
class NFTLoader {
    constructor() {
        this.nfts = {};
        this.cursors = {};
    }
    async load(address) {
        if (this.nfts[address] === undefined) {
            const result = await fetch(`${Config_1.default.apiURI}/opensea/nfts/${address}`);
            const data = await result.json();
            for (const asset of data.assets) {
                if (asset.image_url === null) {
                    asset.image_url = asset.collection.image_url;
                }
                if (asset.image_thumbnail_url === null) {
                    asset.image_thumbnail_url = asset.image_url;
                }
            }
            this.nfts[address] = data.assets;
            if (data.next !== null) {
                this.cursors[address] = data.next;
            }
        }
        return this.nfts[address];
    }
    async loadMore(address) {
        if (this.cursors[address] !== undefined) {
            const result = await fetch(`${Config_1.default.apiURI}/opensea/nfts/${address}?cursor=${this.cursors[address]}`);
            const data = await result.json();
            for (const asset of data.assets) {
                if (asset.image_url === null) {
                    asset.image_url = asset.collection.image_url;
                }
                if (asset.image_thumbnail_url === null) {
                    asset.image_thumbnail_url = asset.image_url;
                }
            }
            this.nfts[address] = [...this.nfts[address], ...data.assets];
            if (data.next === null) {
                delete this.cursors[address];
            }
            else {
                this.cursors[address] = data.next;
            }
            return data.assets;
        }
        return [];
    }
}
exports.default = new NFTLoader();
//# sourceMappingURL=NFTLoader.js.map