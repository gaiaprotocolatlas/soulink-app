"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetadataLoader {
    async loadMetadata(address, tokenId) {
        try {
            const result = await fetch(`https://metadata-cacher.webplusone.com/metadata/ethereum/${address}/${tokenId}`);
            return await result.json();
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new MetadataLoader();
//# sourceMappingURL=MetadataLoader.js.map