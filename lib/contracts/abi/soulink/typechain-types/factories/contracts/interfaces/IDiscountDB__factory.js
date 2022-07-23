"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDiscountDB__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "nft",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "discountRate",
                type: "uint16",
            },
        ],
        name: "UpdateNFTDiscountRate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "discountRate",
                type: "uint16",
            },
        ],
        name: "UpdateUserDiscountRate",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "getDiscountRate",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IDiscountDB__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IDiscountDB__factory = IDiscountDB__factory;
IDiscountDB__factory.abi = _abi;
//# sourceMappingURL=IDiscountDB__factory.js.map