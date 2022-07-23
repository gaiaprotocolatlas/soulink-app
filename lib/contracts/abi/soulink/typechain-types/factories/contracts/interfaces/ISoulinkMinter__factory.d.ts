import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ISoulinkMinter, ISoulinkMinterInterface } from "../../../contracts/interfaces/ISoulinkMinter";
export declare class ISoulinkMinter__factory {
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
    static createInterface(): ISoulinkMinterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISoulinkMinter;
}
//# sourceMappingURL=ISoulinkMinter__factory.d.ts.map