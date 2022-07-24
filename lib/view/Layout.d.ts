import { DomNode } from "skydapp-browser";
import { View } from "skydapp-common";
import Bio from "../datamodel/Bio";
export default class Layout extends View {
    static current: Layout;
    content: DomNode;
    private profile;
    private container;
    bio: Bio;
    constructor();
    ready(addressOrEns: string): Promise<boolean>;
    private showLinkButton;
    close(): void;
}
//# sourceMappingURL=Layout.d.ts.map