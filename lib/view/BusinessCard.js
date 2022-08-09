"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = __importDefault(require("qrcode"));
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const BookmarkManager_1 = __importDefault(require("../BookmarkManager"));
const Layout_1 = __importDefault(require("./Layout"));
class BusinessCard extends skydapp_common_1.View {
    constructor(params) {
        super();
        this.bookmarkHandler = (address) => {
            if (address === Layout_1.default.current.currentAddress) {
                this.bookmarkButton?.empty().appendText("Bookmarked");
                this.bookmarkButton?.addClass("bookmarked");
            }
        };
        this.unbookmarkHandler = (address) => {
            if (address === Layout_1.default.current.currentAddress) {
                this.bookmarkButton?.empty().appendText("Bookmark");
                this.bookmarkButton?.deleteClass("bookmarked");
            }
        };
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout_1.default.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                const qrcodeSrc = await qrcode_1.default.toDataURL(`https://soul.ink/${addressOrEns}`, {
                    margin: 1,
                    scale: 9,
                });
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".business-card-view", (0, skydapp_browser_1.el)("img.qr", { src: qrcodeSrc }), this.bookmarkButton = (0, skydapp_browser_1.el)("a.bookmark", "Bookmark")));
                this.loadBookmarked();
                BookmarkManager_1.default.on("bookmark", this.bookmarkHandler);
                BookmarkManager_1.default.on("unbookmark", this.unbookmarkHandler);
            }
        });
    }
    async loadBookmarked() {
        if (this.bookmarkButton !== undefined) {
            if (Layout_1.default.current.currentAddress !== undefined && BookmarkManager_1.default.check(Layout_1.default.current.currentAddress) === true) {
                this.bookmarkHandler(Layout_1.default.current.currentAddress);
            }
            this.bookmarkButton.onDom("click", () => {
                if (Layout_1.default.current.currentAddress !== undefined) {
                    BookmarkManager_1.default.toggle(Layout_1.default.current.currentAddress);
                }
            });
        }
    }
    changeParams(params, uri) {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    close() {
        BookmarkManager_1.default.off("bookmark", this.bookmarkHandler);
        BookmarkManager_1.default.off("unbookmark", this.unbookmarkHandler);
        this.container?.delete();
        super.close();
    }
}
exports.default = BusinessCard;
//# sourceMappingURL=BusinessCard.js.map