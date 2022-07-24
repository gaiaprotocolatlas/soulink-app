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

    public async isLinked(id0: BigNumber, id1: BigNumber): Promise<boolean> {
        return await this.contract.isLinked(id0, id1);
    }

    public async setLink(targetId: BigNumber, sigs: [string, string], deadlines: [number, number]) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.setLink(targetId, sigs, deadlines);
    }
}

export default new SoulinkContract();
