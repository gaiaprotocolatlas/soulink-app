import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface SoulinkInterface extends utils.Interface {
    functions: {
        "DOMAIN_SEPARATOR()": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "breakLink(uint256)": FunctionFragment;
        "burn(uint256)": FunctionFragment;
        "cancelLinkSig(uint256,uint256,bytes)": FunctionFragment;
        "getTokenId(address)": FunctionFragment;
        "isLinked(uint256,uint256)": FunctionFragment;
        "isMinter(address)": FunctionFragment;
        "isUsableSig(bytes32)": FunctionFragment;
        "mint(address)": FunctionFragment;
        "name()": FunctionFragment;
        "owner()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setBaseURI(string)": FunctionFragment;
        "setLink(uint256,bytes[2],uint256[2])": FunctionFragment;
        "setMinter(address,bool)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "updateSigNotUsable(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DOMAIN_SEPARATOR" | "balanceOf" | "breakLink" | "burn" | "cancelLinkSig" | "getTokenId" | "isLinked" | "isMinter" | "isUsableSig" | "mint" | "name" | "owner" | "ownerOf" | "renounceOwnership" | "setBaseURI" | "setLink" | "setMinter" | "supportsInterface" | "symbol" | "tokenURI" | "totalSupply" | "transferOwnership" | "updateSigNotUsable"): FunctionFragment;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "breakLink", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "burn", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelLinkSig", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "getTokenId", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isLinked", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isUsableSig", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setBaseURI", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLink", values: [
        PromiseOrValue<BigNumberish>,
        [
            PromiseOrValue<BytesLike>,
            PromiseOrValue<BytesLike>
        ],
        [
            PromiseOrValue<BigNumberish>,
            PromiseOrValue<BigNumberish>
        ]
    ]): string;
    encodeFunctionData(functionFragment: "setMinter", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "updateSigNotUsable", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "breakLink", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelLinkSig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isLinked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isUsableSig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setBaseURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLink", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateSigNotUsable", data: BytesLike): Result;
    events: {
        "BreakLink(uint256,uint256)": EventFragment;
        "CancelLinkSig(address,uint256,uint256)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "ResetLink(uint256)": EventFragment;
        "SetBaseURI(string)": EventFragment;
        "SetLink(uint256,uint256)": EventFragment;
        "SetMinter(address,bool)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BreakLink"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CancelLinkSig"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ResetLink"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetBaseURI"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetLink"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetMinter"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export interface BreakLinkEventObject {
    id0: BigNumber;
    id1: BigNumber;
}
export declare type BreakLinkEvent = TypedEvent<[
    BigNumber,
    BigNumber
], BreakLinkEventObject>;
export declare type BreakLinkEventFilter = TypedEventFilter<BreakLinkEvent>;
export interface CancelLinkSigEventObject {
    caller: string;
    targetId: BigNumber;
    deadline: BigNumber;
}
export declare type CancelLinkSigEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], CancelLinkSigEventObject>;
export declare type CancelLinkSigEventFilter = TypedEventFilter<CancelLinkSigEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface ResetLinkEventObject {
    tokenId: BigNumber;
}
export declare type ResetLinkEvent = TypedEvent<[BigNumber], ResetLinkEventObject>;
export declare type ResetLinkEventFilter = TypedEventFilter<ResetLinkEvent>;
export interface SetBaseURIEventObject {
    uri: string;
}
export declare type SetBaseURIEvent = TypedEvent<[string], SetBaseURIEventObject>;
export declare type SetBaseURIEventFilter = TypedEventFilter<SetBaseURIEvent>;
export interface SetLinkEventObject {
    id0: BigNumber;
    id1: BigNumber;
}
export declare type SetLinkEvent = TypedEvent<[
    BigNumber,
    BigNumber
], SetLinkEventObject>;
export declare type SetLinkEventFilter = TypedEventFilter<SetLinkEvent>;
export interface SetMinterEventObject {
    target: string;
    isMinter: boolean;
}
export declare type SetMinterEvent = TypedEvent<[
    string,
    boolean
], SetMinterEventObject>;
export declare type SetMinterEventFilter = TypedEventFilter<SetMinterEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    tokenId: BigNumber;
}
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface Soulink extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SoulinkInterface;
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
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        breakLink(targetId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cancelLinkSig(targetId: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getTokenId(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        isLinked(id0: PromiseOrValue<BigNumberish>, id1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        isMinter(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isUsableSig(sigHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        mint(to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setBaseURI(baseURI_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLink(targetId: PromiseOrValue<BigNumberish>, sigs: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>], deadlines: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMinter(target: PromiseOrValue<string>, _isMinter: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateSigNotUsable(sigHash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    breakLink(targetId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cancelLinkSig(targetId: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getTokenId(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    isLinked(id0: PromiseOrValue<BigNumberish>, id1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    isMinter(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isUsableSig(sigHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    mint(to: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setBaseURI(baseURI_: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLink(targetId: PromiseOrValue<BigNumberish>, sigs: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>], deadlines: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMinter(target: PromiseOrValue<string>, _isMinter: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateSigNotUsable(sigHash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        breakLink(targetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        cancelLinkSig(targetId: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        getTokenId(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isLinked(id0: PromiseOrValue<BigNumberish>, id1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        isMinter(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isUsableSig(sigHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        mint(to: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setBaseURI(baseURI_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setLink(targetId: PromiseOrValue<BigNumberish>, sigs: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>], deadlines: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>], overrides?: CallOverrides): Promise<void>;
        setMinter(target: PromiseOrValue<string>, _isMinter: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateSigNotUsable(sigHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "BreakLink(uint256,uint256)"(id0?: PromiseOrValue<BigNumberish> | null, id1?: PromiseOrValue<BigNumberish> | null): BreakLinkEventFilter;
        BreakLink(id0?: PromiseOrValue<BigNumberish> | null, id1?: PromiseOrValue<BigNumberish> | null): BreakLinkEventFilter;
        "CancelLinkSig(address,uint256,uint256)"(caller?: PromiseOrValue<string> | null, targetId?: PromiseOrValue<BigNumberish> | null, deadline?: null): CancelLinkSigEventFilter;
        CancelLinkSig(caller?: PromiseOrValue<string> | null, targetId?: PromiseOrValue<BigNumberish> | null, deadline?: null): CancelLinkSigEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "ResetLink(uint256)"(tokenId?: PromiseOrValue<BigNumberish> | null): ResetLinkEventFilter;
        ResetLink(tokenId?: PromiseOrValue<BigNumberish> | null): ResetLinkEventFilter;
        "SetBaseURI(string)"(uri?: null): SetBaseURIEventFilter;
        SetBaseURI(uri?: null): SetBaseURIEventFilter;
        "SetLink(uint256,uint256)"(id0?: PromiseOrValue<BigNumberish> | null, id1?: PromiseOrValue<BigNumberish> | null): SetLinkEventFilter;
        SetLink(id0?: PromiseOrValue<BigNumberish> | null, id1?: PromiseOrValue<BigNumberish> | null): SetLinkEventFilter;
        "SetMinter(address,bool)"(target?: PromiseOrValue<string> | null, isMinter?: PromiseOrValue<boolean> | null): SetMinterEventFilter;
        SetMinter(target?: PromiseOrValue<string> | null, isMinter?: PromiseOrValue<boolean> | null): SetMinterEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
    };
    estimateGas: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        breakLink(targetId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cancelLinkSig(targetId: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getTokenId(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isLinked(id0: PromiseOrValue<BigNumberish>, id1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isMinter(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isUsableSig(sigHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        mint(to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setBaseURI(baseURI_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLink(targetId: PromiseOrValue<BigNumberish>, sigs: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>], deadlines: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMinter(target: PromiseOrValue<string>, _isMinter: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateSigNotUsable(sigHash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        breakLink(targetId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        burn(tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cancelLinkSig(targetId: PromiseOrValue<BigNumberish>, deadline: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getTokenId(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isLinked(id0: PromiseOrValue<BigNumberish>, id1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isMinter(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isUsableSig(sigHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setBaseURI(baseURI_: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLink(targetId: PromiseOrValue<BigNumberish>, sigs: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>], deadlines: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMinter(target: PromiseOrValue<string>, _isMinter: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateSigNotUsable(sigHash: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=Soulink.d.ts.map