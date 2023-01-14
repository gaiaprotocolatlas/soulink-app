import { DomNode, el } from "skydapp-browser";
import LinkItem from "./LinkItem.js";
export default class LinkList extends DomNode {
    itemContainer;
    constructor() {
        super(".link-list");
        this.append(this.itemContainer = el(".link-item-container"));
    }
    set links(links) {
        this.itemContainer.empty();
        for (const link of links) {
            this.itemContainer.append(new LinkItem(link.title, link.url));
        }
    }
    addLink(title, url) {
        this.itemContainer.append(new LinkItem(title, url));
    }
}
//# sourceMappingURL=LinkList.js.map