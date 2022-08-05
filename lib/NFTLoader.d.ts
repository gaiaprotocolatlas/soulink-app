import NFTInfo from "./datamodel/NFTInfo";
declare class NFTLoader {
    nfts: {
        [address: string]: NFTInfo[];
    };
    private continuations;
    load(address: string): Promise<NFTInfo[]>;
    loadMore(address: string): Promise<NFTInfo[]>;
}
declare const _default: NFTLoader;
export default _default;
//# sourceMappingURL=NFTLoader.d.ts.map