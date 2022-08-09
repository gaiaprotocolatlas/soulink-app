"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const BookmarkManager_1 = __importDefault(require("../BookmarkManager"));
const SoulDisplay_1 = __importDefault(require("../components/SoulDisplay"));
const Config_1 = __importDefault(require("../Config"));
class Bookmarks extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".bookmarks-view", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("a.back", (0, skydapp_browser_1.el)("i.fa-light.fa-arrow-left"), { click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true) }), (0, skydapp_browser_1.el)("h1", "Bookmarks")), this.bookmarkList = (0, skydapp_browser_1.el)(".bookmark-list")));
        this.load();
    }
    async load() {
        if (BookmarkManager_1.default.all.length > 0) {
            const result = await fetch(`${Config_1.default.apiURI}/bios?addresses=${JSON.stringify(BookmarkManager_1.default.all)}`);
            const bios = await result.json();
            for (const bio of bios) {
                const bookmark = new SoulDisplay_1.default(bio, undefined, (0, skydapp_browser_1.el)("a", (0, skydapp_browser_1.el)("i.fa-light.fa-xmark"), {
                    click: async () => {
                        BookmarkManager_1.default.unbookmark(bio.id);
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
exports.default = Bookmarks;
//# sourceMappingURL=Bookmarks.js.map