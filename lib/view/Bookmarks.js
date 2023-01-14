import { BodyNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import SoulDisplay from "../components/SoulDisplay";
import Config from "../Config";
export default class Bookmarks extends View {
    container;
    bookmarkList;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".bookmarks-view", el("header", el("a.back", el("i.fa-light.fa-arrow-left"), { click: () => history.back() }), el("h1", "Bookmarks")), this.bookmarkList = el(".bookmark-list")));
        this.load();
    }
    async load() {
        if (BookmarkManager.all.length === 0) {
            this.container.append(el("p.empty", "You have no bookmarked Souls."));
        }
        else {
            const result = await fetch(`${Config.apiURI}/bios?addresses=${JSON.stringify(BookmarkManager.all)}`);
            const bios = await result.json();
            for (const bio of bios) {
                const bookmark = new SoulDisplay(bio, undefined, el("a", el("i.fa-light.fa-xmark"), {
                    click: async () => {
                        BookmarkManager.unbookmark(bio.id);
                        bookmark.delete();
                    },
                })).appendTo(this.bookmarkList);
            }
        }
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=Bookmarks.js.map