export default interface Bio {
    name?: string,
    introduce?: string,
    pfp?: {
        address: string,
        tokenId: string,
    },
    background?: {
        address: string,
        tokenId: string,
    },
    links: {
        icon?: string,
        name: string,
        url: string,
    }[];
}