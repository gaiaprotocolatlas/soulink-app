import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";

class NetworkProvider extends EventContainer {

    private ethereum: any | undefined = (window as any).ethereum;
    private get existsInjectedProvider() { return this.ethereum !== undefined; }

    public provider: ethers.providers.JsonRpcProvider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {
        super();
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
        } else {
            this.provider = new ethers.providers.JsonRpcProvider(Config.rpc);
        }
        this.signer = this.provider.getSigner(ethers.constants.AddressZero);
    }

    public async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }

    public async getBalance(address: string) {
        return await this.provider.getBalance(address);
    }

    public async resolveName(name: string) {
        return await this.provider.resolveName(name);
    }

    public async lookupAddress(name: string) {
        return await this.provider.lookupAddress(name);
    }
}

export default new NetworkProvider();
