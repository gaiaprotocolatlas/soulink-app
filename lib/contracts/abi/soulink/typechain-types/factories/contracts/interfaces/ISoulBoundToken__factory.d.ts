import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ISoulBoundToken, ISoulBoundTokenInterface } from "../../../contracts/interfaces/ISoulBoundToken";
export declare class ISoulBoundToken__factory {
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
    static createInterface(): ISoulBoundTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISoulBoundToken;
}
//# sourceMappingURL=ISoulBoundToken__factory.d.ts.map