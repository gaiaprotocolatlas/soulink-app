import { BodyNode, DomNode, el, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import SoulDisplay from "../components/SoulDisplay";
import Config from "../Config";
import Bio from "../datamodel/Bio";

export default class Bookmarks extends View {

    private container: DomNode;
    private bookmarkList: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".bookmarks-view",
            el("header",
                el("a.back", el("i.fa-light.fa-arrow-left"), { click: () => SkyRouter.go("/", undefined, true) }),
                el("h1", "Bookmarks"),
            ),
            this.bookmarkList = el(".bookmark-list"),
        ));
        this.load();
    }

    private async load() {
        if (BookmarkManager.all.length === 0) {
            this.container.append(el("p.empty", "You have no bookmarked Souls."));
        } else {
            const result = await fetch(`${Config.apiURI}/bios?addresses=${JSON.stringify(BookmarkManager.all)}`);
            const bios: Bio[] = await result.json();

            for (const bio of bios) {
                const bookmark = new SoulDisplay(bio, undefined, el("a", el("i.fa-light.fa-xmark"), {
                    click: async () => {
                        BookmarkManager.unbookmark(bio.id!);
                        bookmark.delete();
                    },
                })).appendTo(this.bookmarkList);
            }
        }
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}
