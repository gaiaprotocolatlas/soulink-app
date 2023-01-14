import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config.js";
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
    async resolveName(name) {
        const address = await this.provider.resolveName(name);
        return address === null ? undefined : address;
    }
}
export default new NetworkProvider();
//# sourceMappingURL=Ethereum.js.map