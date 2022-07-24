import { DomNode } from "skydapp-browser";
import { View } from "skydapp-common";
export default class Layout extends View {
    static current: Layout;
    content: DomNode;
    private container;
    constructor();
    set title(title: string);
    close(): void;
}
//# sourceMappingURL=Layout.d.ts.map