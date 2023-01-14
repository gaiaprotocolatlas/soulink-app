import { BigNumber, BigNumberish, ContractInterface, ethers } from "ethers";
import Contract from "../Contract";

export default abstract class SBTContract<CT extends ethers.Contract> extends Contract<CT> {

    constructor(address: string, abi: ContractInterface) {
        super(address, abi);
    }

    public async name(): Promise<string> {
        return await this.contract.name();
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return await this.contract.balanceOf(owner);
    }

    public async burn(tokenId: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.burn(tokenId);
    }
}
