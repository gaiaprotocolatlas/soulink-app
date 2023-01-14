import Config from "../Config";
import SoulinkMinterArtifact from "./abi/soulink/artifacts/contracts/SoulinkMinter.sol/SoulinkMinter.json";
import Contract from "./Contract";
class SoulinkMinterContract extends Contract {
    constructor() {
        super(Config.contracts.SoulinkMinter, SoulinkMinterArtifact.abi);
    }
    async mintPrice() {
        return await this.contract.mintPrice();
    }
    async mint(discount, data, price) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.mint(discount, data, { value: price });
    }
}
export default new SoulinkMinterContract();
//# sourceMappingURL=SoulinkMinterContract.js.map