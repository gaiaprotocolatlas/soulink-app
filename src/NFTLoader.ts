import Config from "./Config";
import NFTInfo from "./datamodel/NFTInfo";

class NFTLoader {

    public nfts: { [address: string]: NFTInfo[] } = {};
    private continuations: { [address: string]: string } = {};

    public async load(address: string): Promise<NFTInfo[]> {
        if (this.nfts[address] === undefined) {
            const result = await fetch(`${Config.apiURI}/nfts/${address}`);
            const data = await result.json();
            this.nfts[address] = data.nfts;
            if (data.continuation !== null) {
                this.continuations[address] = data.continuation;
            }
        }
        return this.nfts[address];
    }

    public async loadMore(address: string): Promise<NFTInfo[]> {
        if (this.continuations[address] !== undefined) {
            const result = await fetch(`${Config.apiURI}/nfts/${address}?continuation=${this.continuations[address]}`);
            const data = await result.json();
            this.nfts[address] = [...this.nfts[address], ...data.nfts];
            if (data.continuation === null) {
                delete this.continuations[address];
            } else {
                this.continuations[address] = data.continuation;
            }
            return data.nfts;
        }
        return [];
    }
}

export default new NFTLoader();
