import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
import Config from "../Config.js";

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

    public async resolveName(name: string) {
        const address = await this.provider.resolveName(name);
        return address === null ? undefined : address;
    }
}

export default new NetworkProvider();
