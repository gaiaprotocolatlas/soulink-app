import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface ISoulinkMinterInterface extends utils.Interface {
    functions: {
        "discountDB()": FunctionFragment;
        "feeTo()": FunctionFragment;
        "limit()": FunctionFragment;
        "mint(bool,bytes)": FunctionFragment;
        "mintPrice()": FunctionFragment;
        "soulink()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "discountDB" | "feeTo" | "limit" | "mint" | "mintPrice" | "soulink"): FunctionFragment;
    encodeFunctionData(functionFragment: "discountDB", values?: undefined): string;
    encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
    encodeFunctionData(functionFragment: "limit", values?: undefined): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<boolean>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "mintPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "soulink", values?: undefined): string;
    decodeFunctionResult(functionFragment: "discountDB", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "limit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "soulink", data: BytesLike): Result;
    events: {
        "SetDiscountDB(address)": EventFragment;
        "SetFeeTo(address)": EventFragment;
        "SetLimit(uint96)": EventFragment;
        "SetMintPrice(uint96)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "SetDiscountDB"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetFeeTo"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetLimit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetMintPrice"): EventFragment;
}
export interface SetDiscountDBEventObject {
    db: string;
}
export declare type SetDiscountDBEvent = TypedEvent<[string], SetDiscountDBEventObject>;
export declare type SetDiscountDBEventFilter = TypedEventFilter<SetDiscountDBEvent>;
export interface SetFeeToEventObject {
    feeTo: string;
}
export declare type SetFeeToEvent = TypedEvent<[string], SetFeeToEventObject>;
export declare type SetFeeToEventFilter = TypedEventFilter<SetFeeToEvent>;
export interface SetLimitEventObject {
    limit: BigNumber;
}
export declare type SetLimitEvent = TypedEvent<[BigNumber], SetLimitEventObject>;
export declare type SetLimitEventFilter = TypedEventFilter<SetLimitEvent>;
export interface SetMintPriceEventObject {
    mintPrice: BigNumber;
}
export declare type SetMintPriceEvent = TypedEvent<[
    BigNumber
], SetMintPriceEventObject>;
export declare type SetMintPriceEventFilter = TypedEventFilter<SetMintPriceEvent>;
export interface ISoulinkMinter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISoulinkMinterInterface;
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
        discountDB(overrides?: CallOverrides): Promise<[string]>;
        feeTo(overrides?: CallOverrides): Promise<[string]>;
        limit(overrides?: CallOverrides): Promise<[BigNumber]>;
        mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintPrice(overrides?: CallOverrides): Promise<[BigNumber]>;
        soulink(overrides?: CallOverrides): Promise<[string]>;
    };
    discountDB(overrides?: CallOverrides): Promise<string>;
    feeTo(overrides?: CallOverrides): Promise<string>;
    limit(overrides?: CallOverrides): Promise<BigNumber>;
    mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintPrice(overrides?: CallOverrides): Promise<BigNumber>;
    soulink(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        discountDB(overrides?: CallOverrides): Promise<string>;
        feeTo(overrides?: CallOverrides): Promise<string>;
        limit(overrides?: CallOverrides): Promise<BigNumber>;
        mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        mintPrice(overrides?: CallOverrides): Promise<BigNumber>;
        soulink(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "SetDiscountDB(address)"(db?: null): SetDiscountDBEventFilter;
        SetDiscountDB(db?: null): SetDiscountDBEventFilter;
        "SetFeeTo(address)"(feeTo?: null): SetFeeToEventFilter;
        SetFeeTo(feeTo?: null): SetFeeToEventFilter;
        "SetLimit(uint96)"(limit?: null): SetLimitEventFilter;
        SetLimit(limit?: null): SetLimitEventFilter;
        "SetMintPrice(uint96)"(mintPrice?: null): SetMintPriceEventFilter;
        SetMintPrice(mintPrice?: null): SetMintPriceEventFilter;
    };
    estimateGas: {
        discountDB(overrides?: CallOverrides): Promise<BigNumber>;
        feeTo(overrides?: CallOverrides): Promise<BigNumber>;
        limit(overrides?: CallOverrides): Promise<BigNumber>;
        mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintPrice(overrides?: CallOverrides): Promise<BigNumber>;
        soulink(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        discountDB(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        limit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        soulink(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ISoulinkMinter.d.ts.map