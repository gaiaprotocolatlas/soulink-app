import { DomNode, el } from "skydapp-browser";
import LinkItem from "./LinkItem.js";

export default class LinkList extends DomNode {

    private itemContainer: DomNode;

    constructor() {
        super(".link-list");
        this.append(
            this.itemContainer = el(".link-item-container"),
        );
    }

    public set links(links: { title: string, url: string }[]) {
        this.itemContainer.empty();
        for (const link of links) {
            this.itemContainer.append(new LinkItem(link.title, link.url));
        }
    }

    public addLink(title: string, url: string) {
        this.itemContainer.append(new LinkItem(title, url));
    }
}
