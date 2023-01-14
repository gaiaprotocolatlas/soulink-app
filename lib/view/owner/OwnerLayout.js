import { BodyNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
export default class OwnerLayout extends View {
    static current;
    content;
    container;
    constructor() {
        super();
        OwnerLayout.current = this;
        BodyNode.append(this.container = el(".owner-layout", this.content = el(".content")));
    }
    set title(title) {
        document.title = `${title} | Soulink`;
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=OwnerLayout.js.map