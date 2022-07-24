import Metadata from "./datamodel/Metadata";

class MetadataLoader {

    public async loadMetadata(address: string, tokenId: string): Promise<Metadata | undefined> {
        try {
            const result = await fetch(`https://metadata-cacher.webplusone.com/metadata/ethereum/${address}/${tokenId}`);
            return await result.json();
        } catch (error) {
            console.error(error);
        }
    }
}

export default new MetadataLoader();
