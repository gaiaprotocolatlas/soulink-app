import ERC721Artifact from "../abi/standards/artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json";
import Contract from "../Contract";
export default class ERC721Contract extends Contract {
    constructor(address, abi) {
        super(address, abi ?? ERC721Artifact.abi);
    }
    async getName() {
        return await this.contract.name();
    }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
    async ownerOf(id) {
        return await this.contract.ownerOf(id);
    }
    async getNonce(id) {
        return await this.contract.nonces(id);
    }
    async getNonceForAll(owner) {
        return await this.contract.noncesForAll(owner);
    }
    async isApprovedForAll(owner, operator) {
        return await this.contract.isApprovedForAll(owner, operator);
    }
    async transferFrom(from, to, tokenId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.transferFrom(from, to, tokenId);
    }
}
//# sourceMappingURL=ERC721Contract.js.map