"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_provider_1 = __importDefault(require("@walletconnect/web3-provider"));
const ethers_1 = require("ethers");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../Config"));
class Wallet extends skydapp_common_1.EventContainer {
    constructor() {
        super();
        this.ethereum = window.ethereum;
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
            this.ethereum.on("chainChanged", (chainId) => {
                this.provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
                this.signer = this.provider.getSigner();
                this.fireEvent("chainchange", ethers_1.BigNumber.from(chainId).toNumber());
            });
        }
        else {
            this.walletConnectProvider = new web3_provider_1.default({ rpc: Config_1.default.rpc });
            this.provider = new ethers_1.ethers.providers.Web3Provider(this.walletConnectProvider);
            this.walletConnectProvider.on("chainChanged", (chainId) => {
                this.fireEvent("chainchange", chainId);
            });
        }
        this.signer = this.provider.getSigner();
        this.checkConnected();
    }
    get existsInjectedProvider() { return this.ethereum !== undefined; }
    async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async loadAddress() {
        if (this.walletConnectProvider?.connected === false) {
            return undefined;
        }
        return (await this.provider.listAccounts())[0];
    }
    async loadChainId() {
        const network = await this.provider.getNetwork();
        return network.chainId;
    }
    async connected() {
        return await this.loadAddress() !== undefined;
    }
    async connect() {
        if (this.existsInjectedProvider === true) {
            await this.ethereum.request({ method: "eth_requestAccounts" });
        }
        else {
            await this.walletConnectProvider?.enable();
        }
        this.checkConnected();
    }
    async disconnectFromWalletConnect() {
        if (this.existsInjectedProvider !== true) {
            await this.walletConnectProvider?.disconnect();
            location.reload();
        }
    }
    async changeNetwork(chainId, chainName, currency, rpc, blockExplorer) {
        let provider;
        if (this.existsInjectedProvider === true) {
            provider = this.ethereum;
        }
        else {
            provider = this.walletConnectProvider;
        }
        if (provider !== undefined) {
            await provider.request({
                method: "wallet_addEthereumChain", params: [{
                        chainId: ethers_1.ethers.utils.hexlify(chainId),
                        chainName,
                        nativeCurrency: currency,
                        rpcUrls: [rpc],
                        blockExplorerUrls: blockExplorer === undefined ? [] : [blockExplorer]
                    }],
            });
            await provider.request({
                method: "wallet_switchEthereumChain", params: [{
                        chainId: ethers_1.ethers.utils.hexlify(chainId),
                    }],
            });
        }
    }
    async signMessage(message) {
        const address = await this.loadAddress();
        let signedMessage;
        if (this.existsInjectedProvider === true) {
            signedMessage = await this.ethereum.request({
                method: "personal_sign",
                params: [message, address],
            });
        }
        else {
            signedMessage = await this.walletConnectProvider?.request({
                method: "personal_sign",
                params: [message, address],
            });
        }
        return signedMessage;
    }
    async signTypedData(owner, name, version, verifyingContract, primaryType, types, message) {
        const data = JSON.stringify({
            types: {
                EIP712Domain: [
                    { name: "name", type: "string" },
                    { name: "version", type: "string" },
                    { name: "chainId", type: "uint256" },
                    { name: "verifyingContract", type: "address" },
                ],
                [primaryType]: types,
            },
            domain: {
                name,
                version,
                chainId: Config_1.default.chainId,
                verifyingContract,
            },
            primaryType,
            message,
        });
        if (this.existsInjectedProvider === true) {
            return await this.ethereum.request({
                method: "eth_signTypedData_v4",
                params: [owner, data],
                from: owner,
            });
        }
        else {
            return await this.walletConnectProvider?.request({
                method: "eth_signTypedData",
                params: [owner, data],
                from: owner,
            });
        }
    }
}
exports.default = new Wallet();
//# sourceMappingURL=Wallet.js.map