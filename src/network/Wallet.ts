import WalletConnectProvider from "@walletconnect/web3-provider";
import { BigNumber, ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";

class Wallet extends EventContainer {

    private ethereum: any | undefined = (window as any).ethereum;
    public get existsInjectedProvider() { return this.ethereum !== undefined; }
    private walletConnectProvider: WalletConnectProvider | undefined;

    public provider: ethers.providers.Web3Provider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {
        super();
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
            this.ethereum.on("chainChanged", (chainId: string) => {
                this.provider = new ethers.providers.Web3Provider(this.ethereum);
                this.signer = this.provider.getSigner();
                this.fireEvent("chainchange", BigNumber.from(chainId).toNumber());
            });
        } else {
            this.walletConnectProvider = new WalletConnectProvider({ rpc: Config.rpc });
            this.provider = new ethers.providers.Web3Provider(this.walletConnectProvider);
            this.walletConnectProvider.on("chainChanged", (chainId: number) => {
                this.fireEvent("chainchange", chainId);
            });
        }
        this.signer = this.provider.getSigner();
        this.checkConnected();
    }

    private async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }

    public async loadAddress(): Promise<string | undefined> {
        if (this.walletConnectProvider?.connected === false) {
            return undefined;
        }
        return (await this.provider.listAccounts())[0];
    }

    public async loadChainId() {
        const network = await this.provider.getNetwork();
        return network.chainId;
    }

    public async connected() {
        return await this.loadAddress() !== undefined;
    }

    public async connect() {
        if (this.existsInjectedProvider === true) {
            await this.ethereum.request({ method: "eth_requestAccounts" });
        } else {
            await this.walletConnectProvider?.enable();
        }
        this.checkConnected();
    }

    public async disconnectFromWalletConnect() {
        if (this.existsInjectedProvider !== true) {
            await this.walletConnectProvider?.disconnect();
            location.reload();
        }
    }

    public async changeNetwork(
        chainId: number,
        chainName: string,
        currency: {
            name: string,
            symbol: string,
            decimals: number,
        },
        rpc: string,
        blockExplorer?: string,
    ) {

        let provider;
        if (this.existsInjectedProvider === true) {
            provider = this.ethereum;
        } else {
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

    public async signMessage(message: string) {
        const address = await this.loadAddress();
        let signedMessage;
        if (this.existsInjectedProvider === true) {
            signedMessage = await this.ethereum.request({
                method: "personal_sign",
                params: [message, address],
            });
        } else {
            signedMessage = await this.walletConnectProvider?.request({
                method: "personal_sign",
                params: [message, address],
            });
        }
        return signedMessage;
    }

    public async signTypedData(
        owner: string | undefined,

        name: string,
        version: string,
        verifyingContract: string,

        primaryType: string,
        types: {
            name: string;
            type: string;
        }[],

        message: any,
    ): Promise<string> {
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
            return await this.ethereum.request({
                method: "eth_signTypedData_v4",
                params: [owner, data],
                from: owner,
            });
        } else {
            return await this.walletConnectProvider?.request({
                method: "eth_signTypedData",
                params: [owner, data],
                from: owner,
            });
        }
    }
}

export default new Wallet();
