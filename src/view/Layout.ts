import { BodyNode, DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private container: DomNode;

    constructor() {
        super();
        Layout.current = this;

        BodyNode.append(this.container = el(".layout",
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