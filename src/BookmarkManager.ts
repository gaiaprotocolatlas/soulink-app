import { Store } from "skydapp-browser";
import { EventContainer, SkyUtil } from "skydapp-common";

class BookmarkManager extends EventContainer {

    private bookmarkStore = new Store("bookmarks");

    public all: string[] = [];

    constructor() {
        super();
        const all = this.bookmarkStore.get<string[]>("bookmarks");
        this.all = all === undefined ? [] : all;
    }

    public check(address: string) {
        return this.all.includes(address);
    }

    private save() {
        this.bookmarkStore.set("bookmarks", this.all);
    }

    public bookmark(address: string) {
        this.all.push(address);
        this.save();
        this.fireEvent("bookmark", address);
    }

    public unbookmark(address: string) {
        SkyUtil.pull(this.all, address);
        this.save();
        this.fireEvent("unbookmark", address);
    }

    public toggle(address: string) {
        if (this.check(address) !== true) {
            this.bookmark(address);
        } else {
            this.unbookmark(address);
        }
    }
}

export default new BookmarkManager();
