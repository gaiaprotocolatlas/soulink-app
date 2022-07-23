import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDiscountDB, IDiscountDBInterface } from "../../../contracts/interfaces/IDiscountDB";
export declare class IDiscountDB__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IDiscountDBInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDiscountDB;
}
//# sourceMappingURL=IDiscountDB__factory.d.ts.map