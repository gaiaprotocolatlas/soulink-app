export default interface Bio {
    introduce?: string,
    color?: string,
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
        title: string,
        url: string,
    }[];
}