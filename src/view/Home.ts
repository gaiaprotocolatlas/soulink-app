import { BodyNode, DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";

export default class Home extends View {

    private container: DomNode;

    constructor() {
        super();
        BodyNode.append(this.container = el(".home-view", "Rebuilding..."));
    }

    public close() {
        this.container.delete();
        super.close();
    }
}
