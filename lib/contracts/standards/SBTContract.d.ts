import { ContractInterface, ethers } from "ethers";
import Contract from "../Contract";
export default abstract class SBTContract<CT extends ethers.Contract> extends Contract<CT> {
    constructor(address: string, abi: ContractInterface);
    name(): Promise<string>;
}
//# sourceMappingURL=SBTContract.d.ts.map