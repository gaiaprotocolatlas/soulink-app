import { DomNode } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Bio from "../datamodel/Bio";
import NFTInfo from "../datamodel/NFTInfo";
export default class Layout extends View {
    static current: Layout;
    content: DomNode;
    private profile;
    private container;
    private addressOrEns;
    bio: Bio;
    nfts: NFTInfo[];
    private currentLink;
    private links;
    constructor(params: ViewParams, uri: string);
    ready(addressOrEns: string, proc: () => Promise<void>): Promise<void>;
    private showLinkButton;
    private highlight;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Layout.d.ts.map