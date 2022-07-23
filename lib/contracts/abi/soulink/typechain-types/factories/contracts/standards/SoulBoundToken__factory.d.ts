import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { SoulBoundToken, SoulBoundTokenInterface } from "../../../contracts/standards/SoulBoundToken";
export declare class SoulBoundToken__factory {
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
    static createInterface(): SoulBoundTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SoulBoundToken;
}
//# sourceMappingURL=SoulBoundToken__factory.d.ts.map