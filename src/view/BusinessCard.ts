import qrcode from "qrcode";
import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import NetworkProvider from "../network/NetworkProvider";
import Layout from "./Layout";

export default class BusinessCard extends View {

    private container: DomNode | undefined;
    private bookmarkButton: DomNode | undefined;

    private currentAddress: string | undefined;

    constructor(params: ViewParams) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    private async load(addressOrEns: string) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {

                const qrcodeSrc = await qrcode.toDataURL(`https://soul.ink/${addressOrEns}/card`, {
                    margin: 1,
                    scale: 9,
                });

                Layout.current.content.append(this.container = el(".business-card-view",
                    el("img.qr", { src: qrcodeSrc }),
                    this.bookmarkButton = el("a.bookmark", "Favorite"),
                ));

                this.loadBookmarked(addressOrEns);
                BookmarkManager.on("bookmark", this.bookmarkHandler);
                BookmarkManager.on("unbookmark", this.unbookmarkHandler);
            }
        });
    }

    private async loadBookmarked(addressOrEns: string) {
        if (this.bookmarkButton !== undefined) {

            this.currentAddress = await NetworkProvider.resolveName(addressOrEns);

            if (BookmarkManager.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }

            this.bookmarkButton.onDom("click", () => {
                if (this.currentAddress !== undefined) {
                    BookmarkManager.toggle(this.currentAddress);
                }
            });
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    private bookmarkHandler = (address: string) => {
        if (address === this.currentAddress) {
            this.bookmarkButton?.empty().appendText("Unfavorite");
            this.bookmarkButton?.addClass("bookmarked");
        }
    };

    private unbookmarkHandler = (address: string) => {
        if (address === this.currentAddress) {
            this.bookmarkButton?.empty().appendText("Favorite");
            this.bookmarkButton?.deleteClass("bookmarked");
        }
    };

    public close(): void {
        BookmarkManager.off("bookmark", this.bookmarkHandler);
        BookmarkManager.off("unbookmark", this.unbookmarkHandler);
        this.container?.delete();
        super.close();
    }
}
