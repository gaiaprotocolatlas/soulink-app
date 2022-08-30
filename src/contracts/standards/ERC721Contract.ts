import { BigNumber, BigNumberish, ContractInterface, ethers } from "ethers";
import ERC721Artifact from "../abi/standards/artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json";
import Contract from "../Contract";

export default class ERC721Contract<CT extends ethers.Contract> extends Contract<CT> {

    constructor(address: string, abi?: ContractInterface) {
        super(address, abi ?? ERC721Artifact.abi);
    }

    public async getName(): Promise<string> {
        return await this.contract.name();
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return await this.contract.balanceOf(owner);
    }

    public async ownerOf(id: BigNumberish): Promise<string> {
        return await this.contract.ownerOf(id);
    }

    public async getNonce(id: BigNumberish): Promise<BigNumber> {
        return await this.contract.nonces(id);
    }

    public async getNonceForAll(owner: string): Promise<BigNumber> {
        return await this.contract.noncesForAll(owner);
    }

    public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return await this.contract.isApprovedForAll(owner, operator);
    }

    public async transferFrom(from: string, to: string, tokenId: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.transferFrom(from, to, tokenId);
    }
}
