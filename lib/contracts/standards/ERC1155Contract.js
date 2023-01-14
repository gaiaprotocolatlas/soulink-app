import ERC1155Artifact from "../abi/standards/artifacts/@openzeppelin/contracts/token/ERC1155/ERC1155.sol/ERC1155.json";
import Contract from "../Contract";
export default class ERC1155Contract extends Contract {
    constructor(address, abi) {
        super(address, abi ?? ERC1155Artifact.abi);
    }
    async getName() {
        return await this.contract.name();
    }
    async getNonce(owner) {
        return await this.contract.nonces(owner);
    }
    async isApprovedForAll(owner, operator) {
        return await this.contract.isApprovedForAll(owner, operator);
    }
    async balanceOf(owner, id) {
        return await this.contract.balanceOf(owner, id);
    }
}
//# sourceMappingURL=ERC1155Contract.js.map