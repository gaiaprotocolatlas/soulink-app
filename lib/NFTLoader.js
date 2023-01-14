import Config from "./Config";
class NFTLoader {
    nfts = {};
    cursors = {};
    async load(address) {
        if (this.nfts[address] === undefined) {
            const result = await fetch(`${Config.apiURI}/nfts/${address}`);
            const data = await result.json();
            for (const asset of data.assets) {
                if (asset.name === null) {
                    asset.name = `${asset.collection.name} #${asset.token_id}`;
                }
                if (asset.image_url === null) {
                    asset.image_url = asset.collection.image_url;
                }
                if (asset.image_url === null) {
                    asset.image_url = "/images/not-found.png";
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
            const result = await fetch(`${Config.apiURI}/nfts/${address}?cursor=${this.cursors[address]}`);
            const data = await result.json();
            for (const asset of data.assets) {
                if (asset.name === null) {
                    asset.name = `${asset.collection.name} #${asset.token_id}`;
                }
                if (asset.image_url === null) {
                    asset.image_url = asset.collection.image_url;
                }
                if (asset.image_url === null) {
                    asset.image_url = "/images/not-found.png";
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
export default new NFTLoader();
//# sourceMappingURL=NFTLoader.js.map