import { DomNode } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Bio from "../datamodel/Bio";
import NFTInfo from "../datamodel/NFTInfo";
export default class Layout extends View {
    static current: Layout;
    content: DomNode;
    private container;
    private profile;
    private imageContainer;
    private editButton;
    private bookmarkButton;
    private addressOrEns;
    private currentAddress;
    bio: Bio;
    nfts: NFTInfo[];
    private currentLink;
    private links;
    constructor(params: ViewParams, uri: string);
    ready(addressOrEns: string, proc: () => Promise<void>): Promise<void>;
    private loadBackground;
    private loadPFP;
    private showButtons;
    private highlight;
    changeParams(params: ViewParams, uri: string): void;
    private bookmarkHandler;
    private unbookmarkHandler;
    close(): void;
}
//# sourceMappingURL=Layout.d.ts.map