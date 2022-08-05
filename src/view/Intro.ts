import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import SoulDisplay from "../components/SoulDisplay";

export default class Intro extends View {

    private container: DomNode;
    private bookmarkList: DomNode;

    constructor() {
        super();
        BodyNode.append(this.container = el(".intro-view",
            el("header"),
            el("main",
                this.bookmarkList = el(".bookmark-list"),
                el("section",
                    el("section",
                        el("h2", "Link your web3's"),
                        el("h1", "Soul"),
                        new ResponsiveImage("img", "/images/intro-image.png"),
                    ),
                    el("section",
                        el("p",
                            "It all started when ", el("b", "BTC"), " became the new gold.\n",
                            el("b", "ETH"), " became the new cash.\n",
                            el("b", "DeFi"), " is replacing banks.\n",
                            el("b", "NFT"), "s have become a means of storing value.\n",
                            el("b", "PFP"), "s replaced our faces.\n",
                            "And now, thanks to ", el("b", "SBT"), "s,\n",
                            "“", el("strong", "Soulink"), "” will be synonymous to “", el("b", "connect"), "”.\n",
                            "Welcome to web 3.",
                        ),
                        el("h6.mobile", el("b", "Let’s"), " Link!"),
                        el(".button-container",
                            el("a", el("b", "Mint"), " Soulink", {
                                click: () => SkyRouter.go("/mint", undefined, true),
                            }),
                            el("a", "Admin", {
                                click: () => SkyRouter.go("/admin", undefined, true),
                            }),
                        ),
                        el("h6.no-mobile", el("b", "Let’s"), " Link!"),
                    ),
                ),
            ),
            el("footer",
                new ResponsiveImage("img", "/images/bottom-logo.png"),
                el(".sns",
                    el("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }),
                    el("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" }),
                ),
            ),
        ));
        this.loadBookmarks();
    }

    private async loadBookmarks() {
        if (BookmarkManager.all.length > 0) {
            this.bookmarkList.append(el("h1", el("i.fa-solid.fa-star")));
            for (const address of BookmarkManager.all) {
                const bookmark = new SoulDisplay(address, el("a", el("i.fa-solid.fa-xmark"), {
                    click: async () => {
                        BookmarkManager.unbookmark(address);
                        bookmark.delete();
                    },
                })).appendTo(this.bookmarkList);
            }
        }
    }

    public close() {
        this.container.delete();
        super.close();
    }
}
