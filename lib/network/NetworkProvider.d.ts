import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class NetworkProvider extends EventContainer {
    private ethereum;
    private get existsInjectedProvider();
    provider: ethers.providers.JsonRpcProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    getBlockNumber(): Promise<number>;
    getBalance(address: string): Promise<ethers.BigNumber>;
    resolveName(name: string): Promise<string | null>;
    lookupAddress(name: string): Promise<string | null>;
}
declare const _default: NetworkProvider;
export default _default;
//# sourceMappingURL=NetworkProvider.d.ts.map