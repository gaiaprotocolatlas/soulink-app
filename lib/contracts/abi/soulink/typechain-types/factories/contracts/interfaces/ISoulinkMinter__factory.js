"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISoulinkMinter__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "db",
                type: "address",
            },
        ],
        name: "SetDiscountDB",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "feeTo",
                type: "address",
            },
        ],
        name: "SetFeeTo",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint96",
                name: "limit",
                type: "uint96",
            },
        ],
        name: "SetLimit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint96",
                name: "mintPrice",
                type: "uint96",
            },
        ],
        name: "SetMintPrice",
        type: "event",
    },
    {
        inputs: [],
        name: "discountDB",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "feeTo",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "limit",
        outputs: [
            {
                internalType: "uint96",
                name: "",
                type: "uint96",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "discount",
                type: "bool",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "mint",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "mintPrice",
        outputs: [
            {
                internalType: "uint96",
                name: "",
                type: "uint96",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "soulink",
        outputs: [
            {
                internalType: "contract ISoulink",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class ISoulinkMinter__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ISoulinkMinter__factory = ISoulinkMinter__factory;
ISoulinkMinter__factory.abi = _abi;
//# sourceMappingURL=ISoulinkMinter__factory.js.map