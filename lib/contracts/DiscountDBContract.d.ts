import { DiscountDBV1 } from "./abi/soulink/typechain-types";
import Contract from "./Contract";
declare class DiscountDBContract extends Contract<DiscountDBV1> {
    constructor();
    getDiscountRate(target: string, data: string): Promise<number>;
}
declare const _default: DiscountDBContract;
export default _default;
//# sourceMappingURL=DiscountDBContract.d.ts.map