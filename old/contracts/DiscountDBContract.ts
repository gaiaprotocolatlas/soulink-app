import Config from "../Config";
import DiscountDBArtifact from "./abi/soulink/artifacts/contracts/DiscountDB.sol/DiscountDBV1.json";
import { DiscountDBV1 } from "./abi/soulink/typechain-types";
import Contract from "./Contract";

class DiscountDBContract extends Contract<DiscountDBV1> {

    constructor() {
        super(Config.contracts.DiscountDB, DiscountDBArtifact.abi);
    }

    public async getDiscountRate(target: string, data: string): Promise<number> {
        return await this.contract.getDiscountRate(target, data);
    }
}

export default new DiscountDBContract();
