import Config from "../Config";
import DiscountDBArtifact from "./abi/soulink/artifacts/contracts/DiscountDB.sol/DiscountDBV1.json";
import Contract from "./Contract";
class DiscountDBContract extends Contract {
    constructor() {
        super(Config.contracts.DiscountDB, DiscountDBArtifact.abi);
    }
    async getDiscountRate(target, data) {
        return await this.contract.getDiscountRate(target, data);
    }
}
export default new DiscountDBContract();
//# sourceMappingURL=DiscountDBContract.js.map