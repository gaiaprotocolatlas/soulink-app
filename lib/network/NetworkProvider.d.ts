import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class NetworkProvider extends EventContainer {
    provider: ethers.providers.JsonRpcProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    getBlockNumber(): Promise<number>;
    getBalance(address: string): Promise<ethers.BigNumber>;
    resolveName(name: string): Promise<string>;
    lookupAddress(name: string): Promise<string>;
}
declare const _default: NetworkProvider;
export default _default;
//# sourceMappingURL=NetworkProvider.d.ts.map