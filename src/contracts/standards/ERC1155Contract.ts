import { BigNumber, BigNumberish, ContractInterface, ethers } from "ethers";
import ERC1155Artifact from "../abi/standards/artifacts/@openzeppelin/contracts/token/ERC1155/ERC1155.sol/ERC1155.json";
import Contract from "../Contract";

export default class ERC1155Contract<CT extends ethers.Contract> extends Contract<CT> {

    constructor(address: string, abi?: ContractInterface) {
        super(address, abi ?? ERC1155Artifact.abi);
    }

    public async getName(): Promise<string> {
        return await this.contract.name();
    }

    public async getNonce(owner: string): Promise<BigNumber> {
        return await this.contract.nonces(owner);
    }

    public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return await this.contract.isApprovedForAll(owner, operator);
    }

    public async balanceOf(owner: string, id: BigNumberish): Promise<BigNumber> {
        return await this.contract.balanceOf(owner, id);
    }
}
