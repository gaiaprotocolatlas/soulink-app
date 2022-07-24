import { DomNode } from "skydapp-browser";
import { View } from "skydapp-common";
export default class AdminLayout extends View {
    static current: AdminLayout;
    content: DomNode;
    private container;
    constructor();
    set title(title: string);
    close(): void;
}
//# sourceMappingURL=AdminLayout.d.ts.map