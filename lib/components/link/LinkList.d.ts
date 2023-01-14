import { DomNode } from "skydapp-browser";
export default class LinkList extends DomNode {
    private itemContainer;
    constructor();
    set links(links: {
        title: string;
        url: string;
    }[]);
    addLink(title: string, url: string): void;
}
//# sourceMappingURL=LinkList.d.ts.map