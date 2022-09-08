import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface SoulinkSignatureCheckerInterface extends utils.Interface {
    functions: {
        "checkSignature(address,uint256,uint256,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "checkSignature"): FunctionFragment;
    encodeFunctionData(functionFragment: "checkSignature", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "checkSignature", data: BytesLike): Result;
    events: {};
}
export interface SoulinkSignatureChecker extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SoulinkSignatureCheckerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        checkSignature(from: PromiseOrValue<string>, toId: PromiseOrValue<BigNumberish>, fromDeadline: PromiseOrValue<BigNumberish>, fromSig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[void]>;
    };
    checkSignature(from: PromiseOrValue<string>, toId: PromiseOrValue<BigNumberish>, fromDeadline: PromiseOrValue<BigNumberish>, fromSig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    callStatic: {
        checkSignature(from: PromiseOrValue<string>, toId: PromiseOrValue<BigNumberish>, fromDeadline: PromiseOrValue<BigNumberish>, fromSig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        checkSignature(from: PromiseOrValue<string>, toId: PromiseOrValue<BigNumberish>, fromDeadline: PromiseOrValue<BigNumberish>, fromSig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        checkSignature(from: PromiseOrValue<string>, toId: PromiseOrValue<BigNumberish>, fromDeadline: PromiseOrValue<BigNumberish>, fromSig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=SoulinkSignatureChecker.d.ts.map