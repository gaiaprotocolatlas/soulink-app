import { Store } from "skydapp-browser";
import { EventContainer, SkyUtil } from "skydapp-common";
class BookmarkManager extends EventContainer {
    bookmarkStore = new Store("bookmarks");
    all = [];
    constructor() {
        super();
        const all = this.bookmarkStore.get("bookmarks");
        this.all = all === undefined ? [] : all;
    }
    check(address) {
        return this.all.includes(address);
    }
    save() {
        this.bookmarkStore.set("bookmarks", this.all, true);
    }
    bookmark(address) {
        this.all.push(address);
        this.save();
        this.fireEvent("bookmark", address);
    }
    unbookmark(address) {
        SkyUtil.pull(this.all, address);
        this.save();
        this.fireEvent("unbookmark", address);
    }
    toggle(address) {
        if (this.check(address) !== true) {
            this.bookmark(address);
        }
        else {
            this.unbookmark(address);
        }
    }
}
export default new BookmarkManager();
//# sourceMappingURL=BookmarkManager.js.map