import { utils, Contract, ContractFactory } from "ethers";
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "approveInternal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "baseURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "exists",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
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
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transferInternal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50604051806040016040528060048152602001634d6f636b60e01b815250604051806040016040528060048152602001634d37323160e01b81525081600090816200005d91906200011a565b5060016200006c82826200011a565b505050620001e6565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000a057607f821691505b602082108103620000c157634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200011557600081815260208120601f850160051c81016020861015620000f05750805b601f850160051c820191505b818110156200011157828155600101620000fc565b5050505b505050565b81516001600160401b0381111562000136576200013662000075565b6200014e816200014784546200008b565b84620000c7565b602080601f8311600181146200018657600084156200016d5750858301515b600019600386901b1c1916600185901b17855562000111565b600085815260208120601f198616915b82811015620001b75788860151825594840194600190910190840162000196565b5085821015620001d65787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61157580620001f66000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80636352211e116100b85780639c9261a51161007c5780639c9261a514610282578063a144819414610295578063a22cb465146102a8578063b88d4fde146102bb578063c87b56dd146102ce578063e985e9c5146102e157600080fd5b80636352211e1461022b5780636c0360eb1461023e57806370a08231146102465780638832e6e31461026757806395d89b411461027a57600080fd5b806323b872dd116100ff57806323b872dd146101cc57806340c10f19146101df57806342842e0e146101f257806342966c68146102055780634f558e791461021857600080fd5b806301ffc9a71461013c57806306fdde0314610164578063081812fc14610179578063095ea7b3146101a4578063222f5be0146101b9575b600080fd5b61014f61014a366004610fda565b61031d565b60405190151581526020015b60405180910390f35b61016c61036f565b60405161015b919061104f565b61018c610187366004611062565b610401565b6040516001600160a01b03909116815260200161015b565b6101b76101b2366004611097565b610428565b005b6101b76101c73660046110c1565b610542565b6101b76101da3660046110c1565b61054d565b6101b76101ed366004611097565b610573565b6101b76102003660046110c1565b610581565b6101b7610213366004611062565b61059c565b61014f610226366004611062565b6105a8565b61018c610239366004611062565b6105c7565b61016c610627565b6102596102543660046110fd565b610643565b60405190815260200161015b565b6101b76102753660046111bb565b6106c9565b61016c6106d4565b6101b7610290366004611222565b6106e3565b6101b76102a3366004611097565b6106ee565b6101b76102b6366004611265565b6106f8565b6101b76102c9366004611298565b610703565b61016c6102dc366004611062565b61073b565b61014f6102ef366004611300565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061034e57506001600160e01b03198216635b5e139f60e01b145b8061036957506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461037e9061132a565b80601f01602080910402602001604051908101604052809291908181526020018280546103aa9061132a565b80156103f75780601f106103cc576101008083540402835291602001916103f7565b820191906000526020600020905b8154815290600101906020018083116103da57829003601f168201915b5050505050905090565b600061040c826107af565b506000908152600460205260409020546001600160a01b031690565b6000610433826105c7565b9050806001600160a01b0316836001600160a01b0316036104a55760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806104c157506104c181336102ef565b6105335760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161049c565b61053d838361080e565b505050565b61053d83838361087c565b6105573382610a18565b6105425760405162461bcd60e51b815260040161049c90611364565b61057d8282610a97565b5050565b61053d83838360405180602001604052806000815250610703565b6105a581610bd9565b50565b6000818152600260205260408120546001600160a01b03161515610369565b6000818152600260205260408120546001600160a01b0316806103695760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161049c565b606061063e60408051602081019091526000815290565b905090565b60006001600160a01b0382166106ad5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161049c565b506001600160a01b031660009081526003602052604090205490565b61053d838383610c74565b60606001805461037e9061132a565b61053d838383610ca7565b61057d8282610d75565b61057d338383610ca7565b61070d3383610a18565b6107295760405162461bcd60e51b815260040161049c90611364565b61073584848484610d8f565b50505050565b6060610746826107af565b600061075d60408051602081019091526000815290565b9050600081511161077d57604051806020016040528060008152506107a8565b8061078784610dc2565b6040516020016107989291906113b2565b6040516020818303038152906040525b9392505050565b6000818152600260205260409020546001600160a01b03166105a55760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161049c565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610843826105c7565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b826001600160a01b031661088f826105c7565b6001600160a01b0316146108f35760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161049c565b6001600160a01b0382166109555760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161049c565b61096060008261080e565b6001600160a01b03831660009081526003602052604081208054600192906109899084906113f7565b90915550506001600160a01b03821660009081526003602052604081208054600192906109b790849061140e565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600080610a24836105c7565b9050806001600160a01b0316846001600160a01b03161480610a6b57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610a8f5750836001600160a01b0316610a8484610401565b6001600160a01b0316145b949350505050565b6001600160a01b038216610aed5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161049c565b6000818152600260205260409020546001600160a01b031615610b525760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161049c565b6001600160a01b0382166000908152600360205260408120805460019290610b7b90849061140e565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000610be4826105c7565b9050610bf160008361080e565b6001600160a01b0381166000908152600360205260408120805460019290610c1a9084906113f7565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b610c7e8383610a97565b610c8b6000848484610ec3565b61053d5760405162461bcd60e51b815260040161049c90611426565b816001600160a01b0316836001600160a01b031603610d085760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161049c565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61057d828260405180602001604052806000815250610c74565b610d9a84848461087c565b610da684848484610ec3565b6107355760405162461bcd60e51b815260040161049c90611426565b606081600003610de95750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e135780610dfd81611478565b9150610e0c9050600a836114a7565b9150610ded565b60008167ffffffffffffffff811115610e2e57610e2e611118565b6040519080825280601f01601f191660200182016040528015610e58576020820181803683370190505b5090505b8415610a8f57610e6d6001836113f7565b9150610e7a600a866114bb565b610e8590603061140e565b60f81b818381518110610e9a57610e9a6114cf565b60200101906001600160f81b031916908160001a905350610ebc600a866114a7565b9450610e5c565b60006001600160a01b0384163b15610fb957604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610f079033908990889088906004016114e5565b6020604051808303816000875af1925050508015610f42575060408051601f3d908101601f19168201909252610f3f91810190611522565b60015b610f9f573d808015610f70576040519150601f19603f3d011682016040523d82523d6000602084013e610f75565b606091505b508051600003610f975760405162461bcd60e51b815260040161049c90611426565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610a8f565b506001949350505050565b6001600160e01b0319811681146105a557600080fd5b600060208284031215610fec57600080fd5b81356107a881610fc4565b60005b83811015611012578181015183820152602001610ffa565b838111156107355750506000910152565b6000815180845261103b816020860160208601610ff7565b601f01601f19169290920160200192915050565b6020815260006107a86020830184611023565b60006020828403121561107457600080fd5b5035919050565b80356001600160a01b038116811461109257600080fd5b919050565b600080604083850312156110aa57600080fd5b6110b38361107b565b946020939093013593505050565b6000806000606084860312156110d657600080fd5b6110df8461107b565b92506110ed6020850161107b565b9150604084013590509250925092565b60006020828403121561110f57600080fd5b6107a88261107b565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261113f57600080fd5b813567ffffffffffffffff8082111561115a5761115a611118565b604051601f8301601f19908116603f0116810190828211818310171561118257611182611118565b8160405283815286602085880101111561119b57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000606084860312156111d057600080fd5b6111d98461107b565b925060208401359150604084013567ffffffffffffffff8111156111fc57600080fd5b6112088682870161112e565b9150509250925092565b8035801515811461109257600080fd5b60008060006060848603121561123757600080fd5b6112408461107b565b925061124e6020850161107b565b915061125c60408501611212565b90509250925092565b6000806040838503121561127857600080fd5b6112818361107b565b915061128f60208401611212565b90509250929050565b600080600080608085870312156112ae57600080fd5b6112b78561107b565b93506112c56020860161107b565b925060408501359150606085013567ffffffffffffffff8111156112e857600080fd5b6112f48782880161112e565b91505092959194509250565b6000806040838503121561131357600080fd5b61131c8361107b565b915061128f6020840161107b565b600181811c9082168061133e57607f821691505b60208210810361135e57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b600083516113c4818460208801610ff7565b8351908301906113d8818360208801610ff7565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611409576114096113e1565b500390565b60008219821115611421576114216113e1565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60006001820161148a5761148a6113e1565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826114b6576114b6611491565b500490565b6000826114ca576114ca611491565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061151890830184611023565b9695505050505050565b60006020828403121561153457600080fd5b81516107a881610fc456fea26469706673582212207a1cdf0ac98c527c030b59130df90c197542b2858e2aa9920c1452be4bedabd564736f6c634300080f0033";
const isSuperArgs = (xs) => xs.length > 1;
export class ERC721Mock__factory extends ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static bytecode = _bytecode;
    static abi = _abi;
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
//# sourceMappingURL=ERC721Mock__factory.js.map