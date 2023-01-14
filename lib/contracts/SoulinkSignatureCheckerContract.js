import Config from "../Config";
import SoulinkSignatureCheckerArtifact from "./abi/soulink/artifacts/contracts/SoulinkSignatureChecker.sol/SoulinkSignatureChecker.json";
import Contract from "./Contract";
class SoulinkSignatureCheckerContract extends Contract {
    constructor() {
        super(Config.contracts.SoulinkSignatureChecker, SoulinkSignatureCheckerArtifact.abi);
    }
    async checkSignature(from, toId, fromDeadline, fromSig) {
        await this.contract.checkSignature(from, toId, fromDeadline, fromSig);
    }
}
export default new SoulinkSignatureCheckerContract();
//# sourceMappingURL=SoulinkSignatureCheckerContract.js.map