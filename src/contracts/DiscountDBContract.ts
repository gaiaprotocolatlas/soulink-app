import Config from "../Config";
import DiscountDBArtifact from "./abi/soulink/artifacts/contracts/DiscountDB.sol/DiscountDBV0.json";
import { DiscountDBV0 } from "./abi/soulink/typechain-types";
import Contract from "./Contract";

class DiscountDBContract extends Contract<DiscountDBV0> {

    constructor() {
        super(Config.contracts.DiscountDB, DiscountDBArtifact.abi);
    }
}

export default new DiscountDBContract();
