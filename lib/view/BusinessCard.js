"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = __importDefault(require("qrcode"));
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const BookmarkManager_1 = __importDefault(require("../BookmarkManager"));
const NetworkProvider_1 = __importDefault(require("../network/NetworkProvider"));
const Layout_1 = __importDefault(require("./Layout"));
class BusinessCard extends skydapp_common_1.View {
    constructor(params) {
        super();
        this.bookmarkHandler = (address) => {
            if (address === this.currentAddress) {
                this.bookmarkButton?.empty().appendText("Unfavorite");
                this.bookmarkButton?.addClass("bookmarked");
            }
        };
        this.unbookmarkHandler = (address) => {
            if (address === this.currentAddress) {
                this.bookmarkButton?.empty().appendText("Favorite");
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
                const qrcodeSrc = await qrcode_1.default.toDataURL(`https://soul.ink/${addressOrEns}/card`, {
                    margin: 1,
                    scale: 9,
                });
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".business-card-view", (0, skydapp_browser_1.el)("img.qr", { src: qrcodeSrc }), this.bookmarkButton = (0, skydapp_browser_1.el)("a.bookmark", "Favorite")));
                this.loadBookmarked(addressOrEns);
                BookmarkManager_1.default.on("bookmark", this.bookmarkHandler);
                BookmarkManager_1.default.on("unbookmark", this.unbookmarkHandler);
            }
        });
    }
    async loadBookmarked(addressOrEns) {
        if (this.bookmarkButton !== undefined) {
            this.currentAddress = await NetworkProvider_1.default.resolveName(addressOrEns);
            if (BookmarkManager_1.default.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
            this.bookmarkButton.onDom("click", () => {
                if (this.currentAddress !== undefined) {
                    BookmarkManager_1.default.toggle(this.currentAddress);
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