/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Soulink, SoulinkInterface } from "../../contracts/Soulink";

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
        internalType: "uint256",
        name: "id0",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id1",
        type: "uint256",
      },
    ],
    name: "BreakLink",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "targetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "CancelLinkSig",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ResetLink",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "SetBaseURI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id0",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id1",
        type: "uint256",
      },
    ],
    name: "SetLink",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "isMinter",
        type: "bool",
      },
    ],
    name: "SetMinter",
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
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    inputs: [
      {
        internalType: "uint256",
        name: "targetId",
        type: "uint256",
      },
    ],
    name: "breakLink",
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
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "targetId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes",
      },
    ],
    name: "cancelLinkSig",
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
    name: "getTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id1",
        type: "uint256",
      },
    ],
    name: "isLinked",
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
        name: "",
        type: "address",
      },
    ],
    name: "isMinter",
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
        internalType: "bytes32",
        name: "sigHash",
        type: "bytes32",
      },
    ],
    name: "isUsableSig",
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
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
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
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseURI_",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "targetId",
        type: "uint256",
      },
      {
        internalType: "bytes[2]",
        name: "sigs",
        type: "bytes[2]",
      },
      {
        internalType: "uint256[2]",
        name: "deadlines",
        type: "uint256[2]",
      },
    ],
    name: "setLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isMinter",
        type: "bool",
      },
    ],
    name: "setMinter",
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
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "sigHash",
        type: "bytes32",
      },
    ],
    name: "updateSigNotUsable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101406040523480156200001257600080fd5b5060405180604001604052806007815260200166536f756c696e6b60c81b815250604051806040016040528060018152602001603160f81b81525060405180604001604052806007815260200166536f756c696e6b60c81b8152506040518060400160405280600281526020016114d360f21b815250620000a26200009c620001b860201b60201c565b620001bc565b6001620000b08382620002b1565b506002620000bf8282620002b1565b5050825160208085019190912083518483012060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81880181905281830187905260608201869052608082019490945230818401528151808203909301835260c0019052805194019390932091935091906080523060c05261012052505033600090815260066020908152604091829020805460ff191660011790558151808301909252601e82527f68747470733a2f2f6170692e736f756c2e696e6b2f6d657461646174612f000090820152600a9250620001b1915082620002b1565b506200037d565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200023757607f821691505b6020821081036200025857634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002ac57600081815260208120601f850160051c81016020861015620002875750805b601f850160051c820191505b81811015620002a85782815560010162000293565b5050505b505050565b81516001600160401b03811115620002cd57620002cd6200020c565b620002e581620002de845462000222565b846200025e565b602080601f8311600181146200031d5760008415620003045750858301515b600019600386901b1c1916600185901b178555620002a8565b600085815260208120601f198616915b828110156200034e578886015182559484019460019091019084016200032d565b50858210156200036d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a05160c05160e0516101005161012051611d9c620003cd6000396000610e7001526000610ebf01526000610e9a01526000610df301526000610e1d01526000610e470152611d9c6000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063b097b8571161007c578063b097b857146102c7578063c87b56dd146102da578063ca87dbab146102ed578063cf456ae714610300578063f153768614610313578063f2fde38b1461032657600080fd5b806370a082311461025d578063715018a6146102705780638da5cb5b14610278578063907a99241461028957806395d89b411461029c578063aa271e1a146102a457600080fd5b806342966c681161011557806342966c68146101d15780634b17fd74146101e65780634d96928c146101f957806355f804b31461020c5780636352211e1461021f5780636a6278421461024a57600080fd5b806301ffc9a71461015257806306fdde031461017a57806318160ddd1461018f57806326f65c9a146101a55780633644e515146101c9575b600080fd5b610165610160366004611770565b610339565b60405190151581526020015b60405180910390f35b610182610370565b60405161017191906117e9565b610197610402565b604051908152602001610171565b6101656101b33660046117fc565b60009081526009602052604090205460ff161590565b610197610432565b6101e46101df3660046117fc565b610441565b005b6101e46101f43660046117fc565b610513565b6101e4610207366004611857565b610536565b6101e461021a3660046118aa565b61065b565b61023261022d3660046117fc565b6106ae565b6040516001600160a01b039091168152602001610171565b610197610258366004611908565b61070b565b61019761026b366004611908565b610809565b6101e461088c565b6000546001600160a01b0316610232565b6101e46102973660046117fc565b6108a0565b610182610966565b6101656102b2366004611908565b60066020526000908152604090205460ff1681565b6101656102d5366004611923565b610975565b6101826102e83660046117fc565b6109aa565b6101e46102fb366004611956565b610a11565b6101e461030e3660046119ae565b610cad565b610197610321366004611908565b610d65565b6101e4610334366004611908565b610d6d565b60006001600160e01b03198216635b5e139f60e01b148061036a57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606001805461037f906119ea565b80601f01602080910402602001604051908101604052809291908181526020018280546103ab906119ea565b80156103f85780601f106103cd576101008083540402835291602001916103f8565b820191906000526020600020905b8154815290600101906020018083116103db57829003601f168201915b5050505050905090565b600554600090610424906001600160801b03600160801b820481169116611a3a565b6001600160801b0316905090565b600061043c610de6565b905090565b8061044b33610d65565b1461048c5760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b60448201526064015b60405180910390fd5b61049581610f0d565b60058054600160801b90046001600160801b03169060106104b583611a62565b82546001600160801b039182166101009390930a9283029190920219909116179055506000818152600860205260408082208290555182917fbb2f1e8df3cfe65fd278e99556fdd39c96443ba45224ad0f7a91e6c7293cee1491a250565b61051b610f9d565b6000908152600960205260409020805460ff19166001179055565b604080517fc3b100a7bf35d534e6c9e325adabf47ef6ec87fd4874fe5d08986fbf0ad1efc4602082015290810185905260608101849052600090610593906080015b60405160208183030381529060405280519060200120610ff7565b90506105d6338285858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061104592505050565b50600083836040516105e9929190611a88565b604051809103902090506105fc81611191565b60008181526009602052604090819020805460ff1916600117905551869033907f8b7370199fbfd2601a62b6f0a0a38138093b301f0e5aa78d773cd352460b57a89061064b9089815260200190565b60405180910390a3505050505050565b610663610f9d565b600a610670828483611afc565b507f23c8c9488efebfd474e85a7956de6f39b17c7ab88502d42a623db2d8e382bbaa82826040516106a2929190611bbd565b60405180910390a15050565b6000818152600360205260408120546001600160a01b03168061036a5760405162461bcd60e51b815260206004820152601560248201527414d0950e881a5b9d985b1a59081d1bdad95b881251605a1b6044820152606401610483565b3360009081526006602052604081205460ff166107595760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b6044820152606401610483565b61076282610809565b156107a05760405162461bcd60e51b815260206004820152600e60248201526d1053149150511657d3525395115160921b6044820152606401610483565b6107a982610d65565b90506107b582826111e1565b600580546001600160801b03169060006107ce83611a62565b82546101009290920a6001600160801b0381810219909316918316021790915560055460008481526008602052604090209116905550919050565b60006001600160a01b0382166108705760405162461bcd60e51b815260206004820152602660248201527f5342543a2061646472657373207a65726f206973206e6f7420612076616c69646044820152651037bbb732b960d11b6064820152608401610483565b506001600160a01b031660009081526004602052604090205490565b610894610f9d565b61089e6000611323565b565b60006108ab33610d65565b90506000806108ba8385611373565b6000828152600760209081526040808320848452909152902054919350915060ff166109155760405162461bcd60e51b815260206004820152600a6024820152691393d517d3125392d15160b21b6044820152606401610483565b6000828152600760209081526040808320848452909152808220805460ff1916905551859185917f390e010097209830b4344cddcbf54990936c4a09a414eb0a540d16dce17a985b9190a350505050565b60606002805461037f906119ea565b60008060006109848585611373565b600091825260076020908152604080842092845291905290205460ff1695945050505050565b60606109b5826113b3565b60006109bf61140f565b905060008151116109df5760405180602001604052806000815250610a0a565b806109e98461141e565b6040516020016109fa929190611bec565b6040516020818303038152906040525b9392505050565b80354211801590610a26575060208101354211155b610a655760405162461bcd60e51b815260206004820152601060248201526f455850495245445f444541444c494e4560801b6044820152606401610483565b6000610a7033610d65565b90506000610ac47fc3b100a7bf35d534e6c9e325adabf47ef6ec87fd4874fe5d08986fbf0ad1efc48685845b6020020135604051602001610578939291909283526020830191909152604082015260600190565b9050610b1933828660005b602002810190610adf9190611c31565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061104592505050565b506000610b268580611c31565b604051610b34929190611a88565b60405180910390209050610b4781611191565b6000818152600960205260408120805460ff19166001908117909155610b92907fc3b100a7bf35d534e6c9e325adabf47ef6ec87fd4874fe5d08986fbf0ad1efc49086908890610a9c565b9050610ba18782886001610acf565b50610baf6020870187611c31565b604051610bbd929190611a88565b60405180910390209150610bd082611191565b6000828152600960205260408120805460ff1916600117905580610bf4868a611373565b6000828152600760209081526040808320848452909152902054919350915060ff1615610c545760405162461bcd60e51b815260206004820152600e60248201526d1053149150511657d3125392d15160921b6044820152606401610483565b6000828152600760209081526040808320848452909152808220805460ff19166001179055518a9188917ffd5159ca1bc2ff0066345aa67a248b5837ae92cd7b8c16e0034b12a075eb4a0b9190a3505050505050505050565b610cb5610f9d565b6001600160a01b03821660009081526006602052604090205481151560ff909116151503610d115760405162461bcd60e51b8152602060048201526009602482015268155390d2105391d15160ba1b6044820152606401610483565b6001600160a01b038216600081815260066020526040808220805460ff191685151590811790915590519092917f1f96bc657d385fd83da973a43f2ad969e6d96b6779b779571a7306db7ca1cd0091a35050565b60008161036a565b610d75610f9d565b6001600160a01b038116610dda5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610483565b610de381611323565b50565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015610e3f57507f000000000000000000000000000000000000000000000000000000000000000046145b15610e6957507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000610f18826106ae565b90506001600160a01b0381166000908152600460205260408120805460019290610f43908490611c78565b909155505060008281526003602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000546001600160a01b0316331461089e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610483565b600061036a611004610de6565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000611054858561152c565b9092509050600081600481111561106d5761106d611c8f565b14801561108b5750856001600160a01b0316826001600160a01b0316145b1561109b57600192505050610a0a565b600080876001600160a01b0316631626ba7e60e01b88886040516024016110c3929190611ca5565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516111019190611cbe565b600060405180830381855afa9150503d806000811461113c576040519150601f19603f3d011682016040523d82523d6000602084013e611141565b606091505b5091509150818015611154575080516020145b801561118557508051630b135d3f60e11b906111799083016020908101908401611cda565b6001600160e01b031916145b98975050505050505050565b60008181526009602052604090205460ff1615610de35760405162461bcd60e51b815260206004820152600e60248201526d555345445f5349474e415455524560901b6044820152606401610483565b6001600160a01b0382166112375760405162461bcd60e51b815260206004820152601d60248201527f5342543a206d696e7420746f20746865207a65726f20616464726573730000006044820152606401610483565b6000818152600360205260409020546001600160a01b03161561129c5760405162461bcd60e51b815260206004820152601960248201527f5342543a20746f6b656e20616c7265616479206d696e746564000000000000006044820152606401610483565b6001600160a01b03821660009081526004602052604081208054600192906112c5908490611cf7565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008061137f846113b3565b611388836113b3565b600084815260086020526040808220548583529120546113a8919061159a565b909590945092505050565b6000818152600360205260409020546001600160a01b0316610de35760405162461bcd60e51b815260206004820152601560248201527414d0950e881a5b9d985b1a59081d1bdad95b881251605a1b6044820152606401610483565b6060600a805461037f906119ea565b6060816000036114455750506040805180820190915260018152600360fc1b602082015290565b8160005b811561146f578061145981611d0f565b91506114689050600a83611d3e565b9150611449565b60008167ffffffffffffffff81111561148a5761148a611a98565b6040519080825280601f01601f1916602001820160405280156114b4576020820181803683370190505b5090505b841561151f576114c9600183611c78565b91506114d6600a86611d52565b6114e1906030611cf7565b60f81b8183815181106114f6576114f6611c1b565b60200101906001600160f81b031916908160001a905350611518600a86611d3e565b94506114b8565b949350505050565b505050565b60008082516041036115625760208301516040840151606085015160001a61155687828585611634565b94509450505050611593565b825160400361158b5760208301516040840151611580868383611721565b935093505050611593565b506000905060025b9250929050565b6000808284036115e25760405162461bcd60e51b81526020600482015260136024820152724944454e544943414c5f41444452455353455360681b6044820152606401610483565b8284106115f05782846115f3565b83835b9092509050816115935760405162461bcd60e51b815260206004820152600c60248201526b5a45524f5f4144445245535360a01b6044820152606401610483565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561166b5750600090506003611718565b8460ff16601b1415801561168357508460ff16601c14155b156116945750600090506004611718565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156116e8573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661171157600060019250925050611718565b9150600090505b94509492505050565b6000806001600160ff1b0383168161173e60ff86901c601b611cf7565b905061174c87828885611634565b935093505050935093915050565b6001600160e01b031981168114610de357600080fd5b60006020828403121561178257600080fd5b8135610a0a8161175a565b60005b838110156117a8578181015183820152602001611790565b838111156117b7576000848401525b50505050565b600081518084526117d581602086016020860161178d565b601f01601f19169290920160200192915050565b602081526000610a0a60208301846117bd565b60006020828403121561180e57600080fd5b5035919050565b60008083601f84011261182757600080fd5b50813567ffffffffffffffff81111561183f57600080fd5b60208301915083602082850101111561159357600080fd5b6000806000806060858703121561186d57600080fd5b8435935060208501359250604085013567ffffffffffffffff81111561189257600080fd5b61189e87828801611815565b95989497509550505050565b600080602083850312156118bd57600080fd5b823567ffffffffffffffff8111156118d457600080fd5b6118e085828601611815565b90969095509350505050565b80356001600160a01b038116811461190357600080fd5b919050565b60006020828403121561191a57600080fd5b610a0a826118ec565b6000806040838503121561193657600080fd5b50508035926020909101359150565b806040810183101561036a57600080fd5b60008060006080848603121561196b57600080fd5b83359250602084013567ffffffffffffffff81111561198957600080fd5b61199586828701611945565b9250506119a58560408601611945565b90509250925092565b600080604083850312156119c157600080fd5b6119ca836118ec565b9150602083013580151581146119df57600080fd5b809150509250929050565b600181811c908216806119fe57607f821691505b602082108103611a1e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60006001600160801b0383811690831681811015611a5a57611a5a611a24565b039392505050565b60006001600160801b03808316818103611a7e57611a7e611a24565b6001019392505050565b8183823760009101908152919050565b634e487b7160e01b600052604160045260246000fd5b601f82111561152757600081815260208120601f850160051c81016020861015611ad55750805b601f850160051c820191505b81811015611af457828155600101611ae1565b505050505050565b67ffffffffffffffff831115611b1457611b14611a98565b611b2883611b2283546119ea565b83611aae565b6000601f841160018114611b5c5760008515611b445750838201355b600019600387901b1c1916600186901b178355611bb6565b600083815260209020601f19861690835b82811015611b8d5786850135825560209485019460019092019101611b6d565b5086821015611baa5760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60008351611bfe81846020880161178d565b835190830190611c1281836020880161178d565b01949350505050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112611c4857600080fd5b83018035915067ffffffffffffffff821115611c6357600080fd5b60200191503681900382131561159357600080fd5b600082821015611c8a57611c8a611a24565b500390565b634e487b7160e01b600052602160045260246000fd5b82815260406020820152600061151f60408301846117bd565b60008251611cd081846020870161178d565b9190910192915050565b600060208284031215611cec57600080fd5b8151610a0a8161175a565b60008219821115611d0a57611d0a611a24565b500190565b600060018201611d2157611d21611a24565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611d4d57611d4d611d28565b500490565b600082611d6157611d61611d28565b50069056fea26469706673582212209c7ea08aed40d10d99b5f3f702632fda849fc3773ad18e6f6de4e9c3a313927e64736f6c634300080f0033";

type SoulinkConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SoulinkConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Soulink__factory extends ContractFactory {
  constructor(...args: SoulinkConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Soulink> {
    return super.deploy(overrides || {}) as Promise<Soulink>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Soulink {
    return super.attach(address) as Soulink;
  }
  override connect(signer: Signer): Soulink__factory {
    return super.connect(signer) as Soulink__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SoulinkInterface {
    return new utils.Interface(_abi) as SoulinkInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Soulink {
    return new Contract(address, _abi, signerOrProvider) as Soulink;
  }
}