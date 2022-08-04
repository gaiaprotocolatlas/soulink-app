import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config";

class NetworkProvider extends EventContainer {

    public provider: ethers.providers.JsonRpcProvider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {
        super();
        this.provider = new ethers.providers.JsonRpcProvider(Config.rpc);
        this.signer = this.provider.getSigner(ethers.constants.AddressZero);
    }

    public async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }

    public async getBalance(address: string) {
        return await this.provider.getBalance(address);
    }

    public async resolveName(name: string) {
        return (await this.provider.resolveName(name))!;
    }

    public async lookupAddress(name: string) {
        return (await this.provider.lookupAddress(name))!;
    }
}

export default new NetworkProvider();
