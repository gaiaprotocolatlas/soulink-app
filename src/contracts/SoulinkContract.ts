import Config from "../Config";
import SoulinkArtifact from "./abi/soulink/artifacts/contracts/Soulink.sol/Soulink.json";
import { Soulink } from "./abi/soulink/typechain-types";
import SBTContract from "./standards/SBTContract";

class SoulinkContract extends SBTContract<Soulink> {

    constructor() {
        super(Config.contracts.Soulink, SoulinkArtifact.abi);
    }
}

export default new SoulinkContract();
