import { DomNode, el } from "skydapp-browser";

export default class LinkItem extends DomNode {

    constructor(title: string, url: string) {
        super(".link-item");
        this.append(
            el("a",
                el(".title", title),
                { href: url, target: "_blank" },
            ),
        );
    }
}
