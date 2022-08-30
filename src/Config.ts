const DEV_MODE = false;

export default DEV_MODE ? {
    apiURI: "https://localhost:1110",
    network: "Popcateum",
    rpc: "https://dataseed.popcateum.org",
    chainId: 1213,
    contracts: {
        Soulink: "0xD50ED1BE18c3C4023c2ba3632C362028fb01fD03",
        SoulinkMinter: "0x5f7BAFDA0E86220F3b79cE6B00B3Dbb5816F9852",
        DiscountDB: "0x00b930EE784A279B4bA7C8Ff778204C064789651",
    },
    discountNFTs: {},
} : {
    apiURI: "https://api.soul.ink",
    network: "Ethereum",
    rpc: "https://cloudflare-eth.com",
    chainId: 1,
    contracts: {
        Soulink: "0xb5a453d6d079d3aE2A103E1B2Daef33b698F706E",
        SoulinkMinter: "0x838A1B44d56a8fb9D8Ee72cb12ECB15fe2aE711F",
        DiscountDB: "0xC6489f154162628560C8Cd9D0A13657570efA2CC",
    },
    discountNFTs: {
        "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb": 1,
        "0xb48E526d935BEe3891222f6aC10A253e31CCaBE1": 1,
        "0xe7df0DcA32eb23F4182055dC6a2053A3fF239315": 1,
        "0xFfFd676Bffd8797f34C2Adc3E808F374CAEe49D8": 1,
        "0xa7298e98362625b65d08bb4c25992c503a0d48db": 1,
        "0xDb63fFDc5FE6A6433dC503Fe33108f5057735058": 2,
    },
};
