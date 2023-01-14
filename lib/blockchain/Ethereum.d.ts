import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class NetworkProvider extends EventContainer {
    private ethereum;
    private get existsInjectedProvider();
    provider: ethers.providers.JsonRpcProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    resolveName(name: string): Promise<string | undefined>;
}
declare const _default: NetworkProvider;
export default _default;
//# sourceMappingURL=Ethereum.d.ts.map