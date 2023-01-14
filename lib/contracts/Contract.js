import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";
export default class Contract extends EventContainer {
    address;
    abi;
    walletContract;
    contract;
    constructor(address, abi) {
        super();
        this.address = address;
        this.abi = abi;
        this.contract = new ethers.Contract(address, abi, NetworkProvider.provider).connect(NetworkProvider.signer);
        for (const part of abi) {
            if (part.type === "event") {
                this.contract.on(part.name, (...args) => {
                    this.fireEvent(part.name, ...args);
                });
            }
        }
        Wallet.on("chainChanged", () => this.walletContract = undefined);
    }
    get interface() {
        return this.contract.interface;
    }
    async getWalletContract() {
        if (await Wallet.connected() === true) {
            if (this.walletContract === undefined && Wallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, Wallet.provider).connect(Wallet.signer);
            }
            return this.walletContract;
        }
    }
    async connectAndGetWalletContract() {
        if (await Wallet.loadChainId() !== Config.chainId) {
            alert(`Wrong Network. Please change to ${Config.network}.`);
            Wallet.disconnectFromWalletConnect();
        }
        else {
            if (await Wallet.connected() !== true) {
                await Wallet.connect();
            }
            if (this.walletContract === undefined && Wallet.signer !== undefined) {
                this.walletContract = new ethers.Contract(this.address, this.abi, Wallet.provider).connect(Wallet.signer);
            }
            return this.walletContract;
        }
    }
}
//# sourceMappingURL=Contract.js.map