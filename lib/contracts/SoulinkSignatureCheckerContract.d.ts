import { BigNumber } from "ethers";
import { SoulinkSignatureChecker } from "./abi/soulink/typechain-types";
import Contract from "./Contract";
declare class SoulinkSignatureCheckerContract extends Contract<SoulinkSignatureChecker> {
    constructor();
    checkSignature(from: string, toId: BigNumber, fromDeadline: BigNumber, fromSig: string): Promise<void>;
}
declare const _default: SoulinkSignatureCheckerContract;
export default _default;
//# sourceMappingURL=SoulinkSignatureCheckerContract.d.ts.map