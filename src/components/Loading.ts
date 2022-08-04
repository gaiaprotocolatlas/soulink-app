import { DomNode, el } from "skydapp-browser";

export default class Loading extends DomNode {

    constructor(message: string) {
        super(".loading-display");
        this.append(
            el(".bar"),
            el("p", message),
        );
    }
}
