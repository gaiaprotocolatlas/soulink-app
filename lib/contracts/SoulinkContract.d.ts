import { BigNumber } from "ethers";
import { Soulink } from "./abi/soulink/typechain-types";
import SBTContract from "./standards/SBTContract";
declare class SoulinkContract extends SBTContract<Soulink> {
    constructor();
    getTokenId(owner: string): Promise<BigNumber>;
    isLinked(id0: BigNumber, id1: BigNumber): Promise<boolean>;
    setLink(targetId: BigNumber, sigs: [string, string], deadlines: [number, number]): Promise<void>;
    breakLink(targetId: BigNumber): Promise<void>;
}
declare const _default: SoulinkContract;
export default _default;
//# sourceMappingURL=SoulinkContract.d.ts.map