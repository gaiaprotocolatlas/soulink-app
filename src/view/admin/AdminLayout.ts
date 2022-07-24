import { BodyNode, DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";

export default class AdminLayout extends View {

    public static current: AdminLayout;
    public content: DomNode;

    private container: DomNode;

    constructor() {
        super();
        AdminLayout.current = this;

        BodyNode.append(this.container = el(".admin-layout",
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