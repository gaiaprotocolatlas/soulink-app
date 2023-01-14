import { ContractInterface, ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";

export default abstract class Contract<CT extends ethers.Contract> extends EventContainer {

    protected walletContract: CT | undefined;
    protected contract: CT;

    constructor(public address: string, private abi: ContractInterface) {
        super();
        this.contract = new ethers.Contract(address, abi, NetworkProvider.provider).connect(NetworkProvider.signer) as CT;
        for (const part of abi as any) {
            if (part.type === "event") {
                this.contract.on(part.name, (...args) => {
                    this.fireEvent(part.name, ...args);
                });
            }
        }
        Wallet.on("chainChanged", () => this.walletContract = undefined);
    }

    public get interface() {
        return this.contract.interface;
    }

    public async getWalletContract() {
        if (await Wallet.connected() === true) {
            if (this.walletContract === undefined && Wallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, Wallet.provider).connect(Wallet.signer) as CT;
            }
            return this.walletContract;
        }
    }

    public async connectAndGetWalletContract() {
        if (await Wallet.loadChainId() !== Config.chainId) {
            alert(`Wrong Network. Please change to ${Config.network}.`);
            Wallet.disconnectFromWalletConnect();
        } else {
            if (await Wallet.connected() !== true) {
                await Wallet.connect();
            }
            if (this.walletContract === undefined && Wallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, Wallet.provider).connect(Wallet.signer) as CT;
            }
            return this.walletContract;
        }
    }
}
