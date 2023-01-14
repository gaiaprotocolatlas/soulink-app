import { DomNode, el } from "skydapp-browser";
export default class LinkItem extends DomNode {
    constructor(title, url) {
        super(".link-item");
        this.append(el("a", el(".title", title), { href: url, target: "_blank" }));
    }
}
//# sourceMappingURL=LinkItem.js.map