import WalletConnectProvider from "@walletconnect/web3-provider";
import { BigNumber, ethers, utils } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";
class Wallet extends EventContainer {
    ethereum = window.ethereum;
    get existsInjectedProvider() { return this.ethereum !== undefined; }
    walletConnectProvider;
    provider;
    signer;
    constructor() {
        super();
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
            this.ethereum.on("chainChanged", (chainId) => {
                this.provider = new ethers.providers.Web3Provider(this.ethereum);
                this.signer = this.provider.getSigner();
                this.fireEvent("chainchange", BigNumber.from(chainId).toNumber());
            });
        }
        else {
            this.walletConnectProvider = new WalletConnectProvider({ rpc: Config.rpc });
            this.provider = new ethers.providers.Web3Provider(this.walletConnectProvider);
            this.walletConnectProvider.on("chainChanged", (chainId) => {
                this.fireEvent("chainchange", chainId);
            });
        }
        this.signer = this.provider.getSigner();
        this.checkConnected();
    }
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
                        chainId: ethers.utils.hexlify(chainId),
                        chainName,
                        nativeCurrency: currency,
                        rpcUrls: [rpc],
                        blockExplorerUrls: blockExplorer === undefined ? [] : [blockExplorer]
                    }],
            });
            await provider.request({
                method: "wallet_switchEthereumChain", params: [{
                        chainId: ethers.utils.hexlify(chainId),
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
                chainId: Config.chainId,
                verifyingContract,
            },
            primaryType,
            message,
        });
        if (this.existsInjectedProvider === true) {
            return utils.joinSignature(await this.ethereum.request({
                method: "eth_signTypedData_v4",
                params: [owner, data],
                from: owner,
            }));
        }
        else {
            return utils.joinSignature(await this.walletConnectProvider?.request({
                method: "eth_signTypedData_v4",
                params: [owner, data],
                from: owner,
            }));
        }
    }
}
export default new Wallet();
//# sourceMappingURL=Wallet.js.map