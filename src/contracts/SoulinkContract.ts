import { BigNumber } from "ethers";
import Config from "../Config";
import SoulinkArtifact from "./abi/soulink/artifacts/contracts/Soulink.sol/Soulink.json";
import { Soulink } from "./abi/soulink/typechain-types";
import SBTContract from "./standards/SBTContract";

class SoulinkContract extends SBTContract<Soulink> {

    constructor() {
        super(Config.contracts.Soulink, SoulinkArtifact.abi);
    }

    public async getTokenId(owner: string): Promise<BigNumber> {
        return await this.contract.getTokenId(owner);
    }
}

export default new SoulinkContract();
