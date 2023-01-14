import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
import SoulinkContract from "../contracts/SoulinkContract";
import Wallet from "../network/Wallet";

export default class Intro extends View {

    private container: DomNode;
    private mintButton: DomNode;
    private adminButton: DomNode;

    constructor() {
        super();
        BodyNode.append(this.container = el(".intro-view",
            el("header",
                el("a.bookmarks", el("i.fa-solid.fa-book-bookmark"), {
                    click: () => SkyRouter.go("/bookmarks", undefined, true),
                }),
                el("a.galaxy", el("i.fa-light.fa-solar-system"), {
                    click: () => SkyRouter.go("/galaxy", undefined, true),
                }),
            ),
            el("main",
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
                        this.mintButton = el("a", el("b", "Mint"), " Soulink", {
                            click: () => SkyRouter.go("/mint", undefined, true),
                        }),
                        this.adminButton = el("a", "My Soul", {
                            click: () => SkyRouter.go("/me", undefined, true),
                        }),
                    ),
                    el("h6.no-mobile", el("b", "Let’s"), " Link!"),
                ),
            ),
            el("footer",
                new ResponsiveImage("img", "/images/bottom-logo.png"),
                el(".sns",
                    el("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }),
                    el("a", "Discord", { href: "https://discord.gg/gaiaprotocol", target: "_blank" }),
                ),
            ),
        ));
        this.check();
    }

    private async check() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = await SoulinkContract.balanceOf(address);
            if (balance.gt(0)) {
                this.mintButton.delete();
            } else {
                this.adminButton.delete();
            }
        }
    }

    public close() {
        this.container.delete();
        super.close();
    }
}
