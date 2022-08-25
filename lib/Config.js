"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEV_MODE = false;
exports.default = DEV_MODE ? {
    apiURI: "https://localhost:1110",
    network: "Popcateum",
    rpc: "https://dataseed.popcateum.org",
    chainId: 1213,
    contracts: {
        Soulink: "0xD50ED1BE18c3C4023c2ba3632C362028fb01fD03",
        SoulinkMinter: "0x5f7BAFDA0E86220F3b79cE6B00B3Dbb5816F9852",
        DiscountDB: "0x00b930EE784A279B4bA7C8Ff778204C064789651",
    },
} : {
    apiURI: "https://api.soul.ink",
    network: "Ethereum",
    rpc: "https://cloudflare-eth.com",
    chainId: 1,
    contracts: {
        Soulink: "0xb5a453d6d079d3aE2A103E1B2Daef33b698F706E",
        SoulinkMinter: "0x838A1B44d56a8fb9D8Ee72cb12ECB15fe2aE711F",
        DiscountDB: "0x1640C880E14F8913bA71644F6812eE58EAeF412F",
    },
};
//# sourceMappingURL=Config.js.map