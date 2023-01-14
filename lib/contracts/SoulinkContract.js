import Config from "../Config";
import SoulinkArtifact from "./abi/soulink/artifacts/contracts/Soulink.sol/Soulink.json";
import SBTContract from "./standards/SBTContract";
class SoulinkContract extends SBTContract {
    constructor() {
        super(Config.contracts.Soulink, SoulinkArtifact.abi);
    }
    async getTokenId(owner) {
        return await this.contract.getTokenId(owner);
    }
    async isLinked(id0, id1) {
        return await this.contract.isLinked(id0, id1);
    }
    async setLink(targetId, sigs, deadlines) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.setLink(targetId, sigs, deadlines);
    }
    async breakLink(targetId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.breakLink(targetId);
    }
}
export default new SoulinkContract();
//# sourceMappingURL=SoulinkContract.js.map