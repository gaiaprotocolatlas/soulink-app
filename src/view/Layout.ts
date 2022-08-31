import { BigNumber } from "ethers";
import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { SkyUtil, View, ViewParams } from "skydapp-common";
import BookmarkManager from "../BookmarkManager";
import Loading from "../components/Loading";
import NFTDisplay from "../components/NFTDisplay";
import NotExistsDisplay from "../components/NotExistsDisplay";
import PFPDisplay from "../components/PFPDisplay";
import Config from "../Config";
import SoulinkContract from "../contracts/SoulinkContract";
import Bio from "../datamodel/Bio";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";
import Alert from "../popup/Alert";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private background: DomNode;
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
    private shareButton: DomNode;

    constructor(params: ViewParams, uri: string) {
        super();
        Layout.current = this;

        BodyNode.append(
            this.background = el(".background-container"),
            this.container = el(".layout",
                el("header",
                    this.editButton = el("a.edit", el("i.fa-solid.fa-pen"), {
                        click: () => SkyRouter.go("/me", undefined, true),
                    }),
                    this.bookmarkButton = el("a.bookmark", el("i.fa-regular.fa-bookmark"), {
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
                    this.shareButton = el("a.share", el("i.fa-solid.fa-share-nodes"), {
                        click: () => navigator.share({ url: `https://soul.ink/${this.addressOrEns}` }),
                    }),
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
            ),
        );

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

            await fetch(`${Config.apiURI}/cache/name/${this.currentAddress}`);
        }

        if (this.addressOrEns !== "") {
            await proc();
        }

        loading.delete();
    }

    private async loadBackground() {
        this.background.empty();
        if (this.bio.background !== undefined) {
            if (this.bio.cachedBackground !== undefined && this.bio.cachedBackground !== null) {
                this.background.append(new NFTDisplay(this.bio.cachedBackground));
            } else {
                this.background.addClass("loading");
                const result = await fetch(`${Config.apiURI}/background/${this.currentAddress}`);
                const str = await result.text();
                if (str !== "") {
                    this.background.append(new NFTDisplay(str));
                }
                this.background.deleteClass("loading");
            }
        }
    }

    private async loadPFP() {
        if (this.pfpContainer !== undefined) {
            this.pfpContainer.empty();
            if (this.bio?.pfp === undefined) {
                this.pfpContainer.append(new ResponsiveImage("img", "/images/default-profile.png"));
            } else if (this.bio.cachedPFP !== undefined && this.bio.cachedPFP !== null) {
                this.pfpContainer.append(new PFPDisplay(this.bio.cachedPFP));
            } else {
                this.pfpContainer.addClass("loading");
                const result = await fetch(`${Config.apiURI}/pfp/${this.currentAddress}`);
                const str = await result.text();
                if (str !== "") {
                    this.pfpContainer.append(new PFPDisplay(str));
                }
                this.pfpContainer.deleteClass("loading");
            }
        }
    }

    private async showButtons() {

        // Clear.
        this.editButton.deleteClass("show");
        this.bookmarkButton.deleteClass("show");
        this.bookmarkButton.empty().append(el("i.fa-regular.fa-bookmark"));
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

            // 연결되어있지 않을 때
            if (isLiked !== true) {

                // 내가 신청한 경우
                const result1 = await fetch(`${Config.apiURI}/request/${walletAddress}/${this.currentAddress}`);
                const str1 = await result1.text();
                if (str1 !== "") {
                    const request = JSON.parse(str1);

                    // 상대가 수락하면 링크 연결
                    if (request.accept !== undefined) {

                        const help = el("p.help", "This person has accepted your Soulink request!").appendTo(this.profile);

                        const confirmButton = el("a.confirm-soulink-button", "Confirm Soulink", {
                            click: async () => {
                                await SoulinkContract.setLink(await SoulinkContract.getTokenId(request.target), [
                                    request.signature,
                                    request.accept.signature,
                                ], [
                                    request.deadline,
                                    request.accept.deadline,
                                ]);
                                help.delete();
                                confirmButton.delete();
                                new Alert("The transaction has been registered. Please wait until it is finished.");
                            },
                        }).appendTo(this.profile);
                    }
                }

                else {

                    // 내가 신청받은 경우
                    const result2 = await fetch(`${Config.apiURI}/request/${this.currentAddress}/${walletAddress}`);
                    const str2 = await result2.text();
                    if (str2 !== "") {

                        const help = el("p.help", "This person has already requested to be Soulinked with you.").appendTo(this.profile);

                        // 수락, 거절 버튼 추가
                        const acceptButton = el("a.accept-soulink-button", "Accept Soulink", {
                            click: async () => {
                                const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                                const signature = await Wallet.signTypedData(walletAddress, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                                    { name: "targetId", type: "uint256" },
                                    { name: "deadline", type: "uint256" },
                                ], {
                                    targetId: BigNumber.from(this.currentAddress),
                                    deadline,
                                });
                                await fetch(`${Config.apiURI}/accept`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        requester: this.currentAddress,
                                        target: walletAddress,
                                        signature,
                                        deadline,
                                    }),
                                });
                                help.delete();
                                acceptButton.delete();
                                ignoreButton.delete();
                                new Alert("Soulink accepted.");
                            },
                        }).appendTo(this.profile);

                        const ignoreButton = el("a.ignore-soulink-button", "Ignore", {
                            click: async () => {
                                const signedMessage = await Wallet.signMessage("Ignore the request.");
                                const loading = new Loading("Ignoring...").appendTo(this.container);
                                await fetch(`${Config.apiURI}/ignore`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        signedMessage,
                                        requester: this.currentAddress,
                                        target: walletAddress,
                                    }),
                                });
                                loading.delete();
                                help.delete();
                                acceptButton.delete();
                                ignoreButton.delete();
                                new Alert("Ignored.");
                            },
                        }).appendTo(this.profile);
                    }

                    else {

                        const requestButton = el("a.request-soulink-button", "Request Soulink", {
                            click: async () => {
                                const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                                const signature = await Wallet.signTypedData(walletAddress, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                                    { name: "targetId", type: "uint256" },
                                    { name: "deadline", type: "uint256" },
                                ], {
                                    targetId: BigNumber.from(this.currentAddress),
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
                                requestButton.delete();
                                new Alert("Soulink requested.");
                            },
                        }).appendTo(this.profile);
                    }
                }
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
            this.currentDot = this.dots.links;
        } else {
            uri = uri.substring(uri.indexOf("/") + 1);
            this.currentDot = this.dots[uri.substring(uri.indexOf("/") + 1)];
        }

        if (navigator.share !== undefined && uri === "card") {
            this.dots.card.style({ display: "none" });
            this.shareButton.style({ display: "block" });
        } else {
            this.dots.card.style({ display: "block" });
            this.shareButton.style({ display: "none" });
        }

        this.currentDot?.addClass("on");
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.highlight(uri);
    }

    private bookmarkHandler = (address: string) => {
        if (address === this.currentAddress) {
            this.bookmarkButton.empty().append(el("i.fa-solid.fa-bookmark"));
            this.bookmarkButton.addClass("bookmarked");
        }
    };

    private unbookmarkHandler = (address: string) => {
        if (address === this.currentAddress) {
            this.bookmarkButton.empty().append(el("i.fa-regular.fa-bookmark"));
            this.bookmarkButton.deleteClass("bookmarked");
        }
    };

    public close(): void {
        BookmarkManager.off("bookmark", this.bookmarkHandler);
        BookmarkManager.off("unbookmark", this.unbookmarkHandler);
        this.container.delete();
        this.background.delete();
        super.close();
    }
}