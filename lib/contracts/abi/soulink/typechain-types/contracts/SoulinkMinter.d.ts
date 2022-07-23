import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface SoulinkMinterInterface extends utils.Interface {
    functions: {
        "discountDB()": FunctionFragment;
        "feeTo()": FunctionFragment;
        "limit()": FunctionFragment;
        "mint(bool,bytes)": FunctionFragment;
        "mintPrice()": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setDiscountDB(address)": FunctionFragment;
        "setFeeTo(address)": FunctionFragment;
        "setLimit(uint96)": FunctionFragment;
        "setMintPrice(uint96)": FunctionFragment;
        "soulink()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "discountDB" | "feeTo" | "limit" | "mint" | "mintPrice" | "owner" | "renounceOwnership" | "setDiscountDB" | "setFeeTo" | "setLimit" | "setMintPrice" | "soulink" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "discountDB", values?: undefined): string;
    encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
    encodeFunctionData(functionFragment: "limit", values?: undefined): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<boolean>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "mintPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setDiscountDB", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setFeeTo", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLimit", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setMintPrice", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "soulink", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "discountDB", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "limit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDiscountDB", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFeeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLimit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMintPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "soulink", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "OwnershipTransferred(address,address)": EventFragment;
        "SetDiscountDB(address)": EventFragment;
        "SetFeeTo(address)": EventFragment;
        "SetLimit(uint96)": EventFragment;
        "SetMintPrice(uint96)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetDiscountDB"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetFeeTo"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetLimit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetMintPrice"): EventFragment;
}
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
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
export interface SoulinkMinter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SoulinkMinterInterface;
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
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setDiscountDB(db: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFeeTo(_feeTo: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLimit(_limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMintPrice(_price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        soulink(overrides?: CallOverrides): Promise<[string]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    discountDB(overrides?: CallOverrides): Promise<string>;
    feeTo(overrides?: CallOverrides): Promise<string>;
    limit(overrides?: CallOverrides): Promise<BigNumber>;
    mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintPrice(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setDiscountDB(db: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFeeTo(_feeTo: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLimit(_limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMintPrice(_price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    soulink(overrides?: CallOverrides): Promise<string>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        discountDB(overrides?: CallOverrides): Promise<string>;
        feeTo(overrides?: CallOverrides): Promise<string>;
        limit(overrides?: CallOverrides): Promise<BigNumber>;
        mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        mintPrice(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setDiscountDB(db: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setFeeTo(_feeTo: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setLimit(_limit: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setMintPrice(_price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        soulink(overrides?: CallOverrides): Promise<string>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
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
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setDiscountDB(db: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFeeTo(_feeTo: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLimit(_limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMintPrice(_price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        soulink(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        discountDB(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        limit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(discount: PromiseOrValue<boolean>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setDiscountDB(db: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFeeTo(_feeTo: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLimit(_limit: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMintPrice(_price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        soulink(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=SoulinkMinter.d.ts.map