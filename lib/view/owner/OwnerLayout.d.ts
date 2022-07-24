import { DomNode } from "skydapp-browser";
import { View } from "skydapp-common";
export default class OwnerLayout extends View {
    static current: OwnerLayout;
    content: DomNode;
    private container;
    constructor();
    set title(title: string);
    close(): void;
}
//# sourceMappingURL=OwnerLayout.d.ts.map