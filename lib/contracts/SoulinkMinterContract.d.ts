import { BigNumber } from "ethers";
import { SoulinkMinter } from "./abi/soulink/typechain-types";
import Contract from "./Contract";
declare class SoulinkMinterContract extends Contract<SoulinkMinter> {
    constructor();
    mintPrice(): Promise<BigNumber>;
    mint(discount: boolean, data: string): Promise<void>;
}
declare const _default: SoulinkMinterContract;
export default _default;
//# sourceMappingURL=SoulinkMinterContract.d.ts.map