import { BigNumber } from "ethers";
import Config from "../Config";
import SoulinkSignatureCheckerArtifact from "./abi/soulink/artifacts/contracts/SoulinkSignatureChecker.sol/SoulinkSignatureChecker.json";
import { SoulinkSignatureChecker } from "./abi/soulink/typechain-types";
import Contract from "./Contract";

class SoulinkSignatureCheckerContract extends Contract<SoulinkSignatureChecker> {

    constructor() {
        super(Config.contracts.SoulinkSignatureChecker, SoulinkSignatureCheckerArtifact.abi);
    }

    public async checkSignature(from: string, toId: BigNumber, fromDeadline: BigNumber, fromSig: string): Promise<void> {
        await this.contract.checkSignature(from, toId, fromDeadline, fromSig);
    }
}

export default new SoulinkSignatureCheckerContract();
