import Contract from "../Contract";
export default class SBTContract extends Contract {
    constructor(address, abi) {
        super(address, abi);
    }
    async name() {
        return await this.contract.name();
    }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
    async burn(tokenId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.burn(tokenId);
    }
}
//# sourceMappingURL=SBTContract.js.map