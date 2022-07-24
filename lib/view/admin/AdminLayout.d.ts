import { DomNode } from "skydapp-browser";
import { View } from "skydapp-common";
import Bio from "../../datamodel/Bio";
export default class AdminLayout extends View {
    static current: AdminLayout;
    content: DomNode;
    private container;
    address: string;
    bio: Bio;
    constructor();
    ready(): Promise<boolean>;
    private save;
    close(): void;
}
//# sourceMappingURL=AdminLayout.d.ts.map