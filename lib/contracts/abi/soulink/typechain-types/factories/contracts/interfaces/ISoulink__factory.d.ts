import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ISoulink, ISoulinkInterface } from "../../../contracts/interfaces/ISoulink";
export declare class ISoulink__factory {
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
    static createInterface(): ISoulinkInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISoulink;
}
//# sourceMappingURL=ISoulink__factory.d.ts.map