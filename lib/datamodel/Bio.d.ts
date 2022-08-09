export default interface Bio {
    id?: string;
    introduce?: string;
    color?: string;
    pfp?: {
        address: string;
        tokenId: string;
    };
    background?: {
        address: string;
        tokenId: string;
    };
    links: {
        icon?: string;
        title: string;
        url: string;
    }[];
    cachedName?: string;
    cachedPFP?: string;
    cachedBackground?: string;
}
//# sourceMappingURL=Bio.d.ts.map