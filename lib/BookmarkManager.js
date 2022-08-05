"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
class BookmarkManager extends skydapp_common_1.EventContainer {
    constructor() {
        super();
        this.bookmarkStore = new skydapp_browser_1.Store("bookmarks");
        this.all = [];
        const all = this.bookmarkStore.get("bookmarks");
        this.all = all === undefined ? [] : all;
    }
    check(address) {
        return this.all.includes(address);
    }
    save() {
        this.bookmarkStore.set("bookmarks", this.all);
    }
    bookmark(address) {
        this.all.push(address);
        this.save();
        this.fireEvent("bookmark", address);
    }
    unbookmark(address) {
        skydapp_common_1.SkyUtil.pull(this.all, address);
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
exports.default = new BookmarkManager();
//# sourceMappingURL=BookmarkManager.js.map