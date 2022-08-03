import { DomNode, el } from "skydapp-browser";

export default class Loading extends DomNode {

    constructor(message: string) {
        super(".loading");
        this.append(
            el(".bar"),
            el("p", message),
        );
    }
}
