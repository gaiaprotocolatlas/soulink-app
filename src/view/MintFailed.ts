import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";

export default class MintFailed extends View {

    private container: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".mint-failed-view",
        ));
    }

    public close(): void {
        this.container.delete();
    }
}