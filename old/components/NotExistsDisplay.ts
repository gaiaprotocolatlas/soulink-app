import { DomNode, el } from "skydapp-browser";

export default class NotExistsDisplay extends DomNode {

    constructor() {
        super(".not-exists");
        this.append(
            el("p", "The page you’re looking for doesn’t exist."),
        );
    }
}
