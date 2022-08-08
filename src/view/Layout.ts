import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { SkyUtil, View, ViewParams } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import Loading from "../components/Loading";
import NotExistsDisplay from "../components/NotExistsDisplay";
import PFPDisplay from "../components/PFPDisplay";
import Config from "../Config";
import SoulinkContract from "../contracts/SoulinkContract";
import Bio from "../datamodel/Bio";
import MetadataLoader from "../MetadataLoader";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";
import Alert from "../popup/Alert";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private container: DomNode;
    private menu: DomNode;
    private profile: DomNode;
    private pfpContainer: DomNode | undefined;
    private editButton: DomNode;
    private bookmarkButton: DomNode;

    private addressOrEns: string = "";
    public currentAddress: string | undefined;

    public bio: Bio = { links: [] };

    private currentDot: DomNode | undefined;
    private dots: { [name: string]: DomNode } = {};

    constructor(params: ViewParams, uri: string) {
        super();
        Layout.current = this;

        BodyNode.append(this.container = el(".layout",
            el("header",
                this.editButton = el("a.edit", el("i.fa-solid.fa-pen"), {
                    click: () => SkyRouter.go("/admin", undefined, true),
                }),
                this.bookmarkButton = el("a.bookmark", el("i.fa-regular.fa-star"), {
                    click: () => {
                        if (this.currentAddress !== undefined) {
                            BookmarkManager.toggle(this.currentAddress);
                        }
                    },
                }),
                this.menu = el(".menu",
                    el(".bar",
                        this.dots["links"] = el("a", el(".dot"), { click: () => SkyRouter.go(`/${this.addressOrEns}`, undefined, true) }),
                        this.dots["souls"] = el("a", el(".dot"), { click: () => SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true) }),
                        this.dots["nfts"] = el("a", el(".dot"), { click: () => SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true) }),
                    ),
                    el("a", "Links", { click: () => SkyRouter.go(`/${this.addressOrEns}`, undefined, true) }),
                    el("a.long", "Linked Souls", { click: () => { SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true) } }),
                    el("a", "NFTs", { click: () => SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true) }),
                ),
                this.dots["card"] = el("a.card", el("i.fa-solid.fa-id-card-clip"), { click: () => SkyRouter.go(`/${this.addressOrEns}/card`, undefined, true) }),
                //el("a.share", el("i.fa-solid.fa-share-nodes"), {
                //    click: () => navigator.share({ url: `https://soul.ink/${this.addressOrEns}` }),
                //}),
            ),
            el("main",
                this.profile = el(".profile"),
                this.content = el(".content"),
            ),
            el("footer",
                el("a", new ResponsiveImage("img", "/images/logo.png"), {
                    click: () => SkyRouter.go("/", undefined, true),
                }),
            ),
        ));

        this.highlight(uri);
        BookmarkManager.on("bookmark", this.bookmarkHandler);
        BookmarkManager.on("unbookmark", this.unbookmarkHandler);
    }

    public async ready(addressOrEns: string, proc: () => Promise<void>) {
        const loading = new Loading("Loading...").appendTo(this.container);

        if (this.addressOrEns !== addressOrEns) {

            this.addressOrEns = addressOrEns;
            if (addressOrEns.indexOf("0x") === 0) {
                this.currentAddress = addressOrEns;
            } else {

                const result = await fetch(`${Config.apiURI}/cached-address/${addressOrEns}`);
                const cachedAddress = await result.text();
                if (cachedAddress !== "") {
                    this.currentAddress = cachedAddress;
                } else {
                    const address = await NetworkProvider.resolveName(addressOrEns);
                    if (address !== null) {
                        this.currentAddress = address;
                    }
                }
            }

            const result = await fetch(`${Config.apiURI}/bio/${this.currentAddress}`);
            const str = await result.text();

            this.profile.empty();
            this.content.empty();

            if (str === "") {
                document.title = "Soulink | Page Not Found";
                this.content.append(new NotExistsDisplay());
            }

            else {
                this.bio = JSON.parse(str);

                const name = addressOrEns.indexOf("0x") === 0 ? SkyUtil.shortenAddress(addressOrEns) : addressOrEns;
                document.title = `${name} | Soulink`;

                this.profile.append(
                    this.pfpContainer = el(".pfp-container"),
                    el(".name", name),
                    el(".introduce", this.bio.introduce),
                );

                this.menu.style({ color: this.bio.color });
                this.profile.style({ color: this.bio.color });

                this.loadBackground();
                this.loadPFP();
                this.showButtons();
            }

            await fetch(`${Config.apiURI}/cache/${this.currentAddress}`);
        }

        if (this.addressOrEns !== "") {
            await proc();
        }

        loading.delete();
    }

    private async loadBackground() {
        this.container.style({ backgroundImage: undefined });
        if (this.bio.background !== undefined) {
            this.container.addClass("loading");
            const metadata: any = await MetadataLoader.loadMetadata(this.bio.background.address, this.bio.background.tokenId);
            const url = metadata?.imageInfo?.cachedURL;
            if (url !== undefined) {
                this.container.style({ backgroundImage: `url(${url})` });
            }
            this.container.deleteClass("loading");
        }
    }

    private async loadPFP() {
        this.pfpContainer?.empty().append(new PFPDisplay(this.bio.cachedPFP));
    }

    private async showButtons() {

        // Clear.
        this.editButton.deleteClass("show");
        this.bookmarkButton.deleteClass("show");
        this.bookmarkButton.empty().append(el("i.fa-regular.fa-star"));
        this.bookmarkButton.deleteClass("bookmarked");

        const walletAddress = await Wallet.loadAddress();
        if (walletAddress === undefined) {
            this.bookmarkButton.addClass("show");
            if (this.currentAddress !== undefined && BookmarkManager.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
        }

        else if (this.currentAddress !== undefined && this.currentAddress !== walletAddress) {

            const isLiked = await SoulinkContract.isLinked(
                await SoulinkContract.getTokenId(this.currentAddress),
                await SoulinkContract.getTokenId(walletAddress),
            );

            if (isLiked !== true) {

                this.profile.append(el("a.request-soulink-button", "Request Soulink", {
                    click: async () => {
                        const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                        const signature = await Wallet.signTypedData(walletAddress, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                            { name: "to", type: "address" },
                            { name: "deadline", type: "uint256" },
                        ], {
                            to: this.currentAddress,
                            deadline,
                        });
                        await fetch(`${Config.apiURI}/request`, {
                            method: "POST",
                            body: JSON.stringify({
                                requester: walletAddress,
                                target: this.currentAddress,
                                signature,
                                deadline,
                            }),
                        });
                        new Alert("Soulink requested.");
                    },
                }));
            }

            this.bookmarkButton.addClass("show");
            if (BookmarkManager.check(this.currentAddress) === true) {
                this.bookmarkHandler(this.currentAddress);
            }
        }

        else {
            this.editButton.addClass("show");
        }
    }

    private highlight(uri: string) {
        this.currentDot?.deleteClass("on");
        if (uri.indexOf("/") === -1) {
            this.currentDot = this.dots["links"];
        } else {
            uri = uri.substring(uri.indexOf("/") + 1);
            this.currentDot = this.dots[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentDot?.addClass("on");
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.highlight(uri);
    }

    private bookmarkHandler = (address: string) => {
        if (address === this.currentAddress) {
            this.bookmarkButton.empty().append(el("i.fa-solid.fa-star"));
            this.bookmarkButton.addClass("bookmarked");
        }
    };

    private unbookmarkHandler = (address: string) => {
        if (address === this.currentAddress) {
            this.bookmarkButton.empty().append(el("i.fa-regular.fa-star"));
            this.bookmarkButton.deleteClass("bookmarked");
        }
    };

    public close(): void {
        BookmarkManager.off("bookmark", this.bookmarkHandler);
        BookmarkManager.off("unbookmark", this.unbookmarkHandler);
        this.container.delete();
        super.close();
    }
}