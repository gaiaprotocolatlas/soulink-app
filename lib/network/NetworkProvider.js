import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";
class NetworkProvider extends EventContainer {
    ethereum = window.ethereum;
    get existsInjectedProvider() { return this.ethereum !== undefined; }
    provider;
    signer;
    constructor() {
        super();
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
        }
        else {
            this.provider = new ethers.providers.JsonRpcProvider(Config.rpc);
        }
        this.signer = this.provider.getSigner(ethers.constants.AddressZero);
    }
    async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }
    async getBalance(address) {
        return await this.provider.getBalance(address);
    }
    async resolveName(name) {
        return await this.provider.resolveName(name);
    }
    async lookupAddress(name) {
        return await this.provider.lookupAddress(name);
    }
}
export default new NetworkProvider();
//# sourceMappingURL=NetworkProvider.js.map