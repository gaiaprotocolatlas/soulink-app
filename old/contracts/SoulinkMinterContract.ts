import { BigNumber } from "ethers";
import Config from "../Config";
import SoulinkMinterArtifact from "./abi/soulink/artifacts/contracts/SoulinkMinter.sol/SoulinkMinter.json";
import { SoulinkMinter } from "./abi/soulink/typechain-types";
import Contract from "./Contract";

class SoulinkMinterContract extends Contract<SoulinkMinter> {

    constructor() {
        super(Config.contracts.SoulinkMinter, SoulinkMinterArtifact.abi);
    }

    public async mintPrice(): Promise<BigNumber> {
        return await this.contract.mintPrice();
    }

    public async mint(discount: boolean, data: string, price: BigNumber) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.mint(discount, data, { value: price });
    }
}

export default new SoulinkMinterContract();
