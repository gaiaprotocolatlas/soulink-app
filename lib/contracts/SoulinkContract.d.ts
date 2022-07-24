import { BigNumber } from "ethers";
import { Soulink } from "./abi/soulink/typechain-types";
import SBTContract from "./standards/SBTContract";
declare class SoulinkContract extends SBTContract<Soulink> {
    constructor();
    getTokenId(owner: string): Promise<BigNumber>;
}
declare const _default: SoulinkContract;
export default _default;
//# sourceMappingURL=SoulinkContract.d.ts.map