import { BodyNode, DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";

export default class OwnerLayout extends View {

    public static current: OwnerLayout;
    public content: DomNode;

    private container: DomNode;

    constructor() {
        super();
        OwnerLayout.current = this;

        BodyNode.append(this.container = el(".owner-layout",
            this.content = el(".content"),
        ));
    }

    public set title(title: string) {
        document.title = `${title} | Soulink`;
    }

    public close(): void {
        this.container.delete();
    }
}