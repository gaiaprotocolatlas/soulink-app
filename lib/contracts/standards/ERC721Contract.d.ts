import { BigNumber, BigNumberish, ContractInterface, ethers } from "ethers";
import Contract from "../Contract";
export default class ERC721Contract<CT extends ethers.Contract> extends Contract<CT> {
    constructor(address: string, abi?: ContractInterface);
    getName(): Promise<string>;
    balanceOf(owner: string): Promise<BigNumber>;
    ownerOf(id: BigNumberish): Promise<string>;
    getNonce(id: BigNumberish): Promise<BigNumber>;
    getNonceForAll(owner: string): Promise<BigNumber>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
    transferFrom(from: string, to: string, tokenId: BigNumberish): Promise<void>;
}
//# sourceMappingURL=ERC721Contract.d.ts.map