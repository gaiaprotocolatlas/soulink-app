import qrcode from "qrcode";
import { el } from "skydapp-browser";
import { View } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import Layout from "./Layout";
export default class BusinessCard extends View {
    container;
    bookmarkButton;
    constructor(params) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                const qrcodeSrc = await qrcode.toDataURL(`https://soul.ink/${addressOrEns}`, {
                    margin: 1,
                    scale: 9,
                });
                Layout.current.content.append(this.container = el(".business-card-view", el("img.qr", { src: qrcodeSrc }), this.bookmarkButton = el("a.bookmark", "Bookmark")));
                this.loadBookmarked();
                BookmarkManager.on("bookmark", this.bookmarkHandler);
                BookmarkManager.on("unbookmark", this.unbookmarkHandler);
            }
        });
    }
    async loadBookmarked() {
        if (this.bookmarkButton !== undefined) {
            if (Layout.current.currentAddress !== undefined && BookmarkManager.check(Layout.current.currentAddress) === true) {
                this.bookmarkHandler(Layout.current.currentAddress);
            }
            this.bookmarkButton.onDom("click", () => {
                if (Layout.current.currentAddress !== undefined) {
                    BookmarkManager.toggle(Layout.current.currentAddress);
                }
            });
        }
    }
    changeParams(params, uri) {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    bookmarkHandler = (address) => {
        if (address === Layout.current.currentAddress) {
            this.bookmarkButton?.empty().appendText("Bookmarked");
            this.bookmarkButton?.addClass("bookmarked");
        }
    };
    unbookmarkHandler = (address) => {
        if (address === Layout.current.currentAddress) {
            this.bookmarkButton?.empty().appendText("Bookmark");
            this.bookmarkButton?.deleteClass("bookmarked");
        }
    };
    close() {
        BookmarkManager.off("bookmark", this.bookmarkHandler);
        BookmarkManager.off("unbookmark", this.unbookmarkHandler);
        this.container?.delete();
        super.close();
    }
}
//# sourceMappingURL=BusinessCard.js.map