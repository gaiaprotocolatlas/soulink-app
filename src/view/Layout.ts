import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { SkyUtil, View, ViewParams } from "skydapp-common";
import Loading from "../components/Loading";
import NotExistsDisplay from "../components/NotExistsDisplay";
import Config from "../Config";
import SoulinkContract from "../contracts/SoulinkContract";
import Bio from "../datamodel/Bio";
import NFTInfo from "../datamodel/NFTInfo";
import MetadataLoader from "../MetadataLoader";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";
import Alert from "../popup/Alert";

export default class Layout extends View {

    public static current: Layout;
    public content: DomNode;

    private container: DomNode;
    private profile: DomNode;
    private imageContainer: DomNode | undefined;
    private editButton: DomNode;

    private addressOrEns: string = "";
    public bio: Bio = { links: [] };
    public nfts: NFTInfo[] = [];

    private currentLink: DomNode | undefined;
    private links: { [name: string]: DomNode } = {};

    constructor(params: ViewParams, uri: string) {
        super();
        Layout.current = this;

        BodyNode.append(this.container = el(".layout",
            el("header",
                this.editButton = el("a.edit", el("i.fa-solid.fa-pen"), {
                    click: () => SkyRouter.go("/admin", undefined, true),
                }),
                el(".menu",
                    this.links["links"] = el("a", "Links", { click: () => { SkyRouter.go(`/${this.addressOrEns}`, undefined, true) } }),
                    this.links["nfts"] = el("a", "NFTs", { click: () => { SkyRouter.go(`/${this.addressOrEns}/nfts`, undefined, true) } }),
                    this.links["souls"] = el("a", "Linked Souls", { click: () => { SkyRouter.go(`/${this.addressOrEns}/souls`, undefined, true) } }),
                ),
                el("a.card", el("i.fa-solid.fa-id-card-clip"), { click: () => { SkyRouter.go(`/${this.addressOrEns}/card`, undefined, true) } }),
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
    }

    public async ready(addressOrEns: string, proc: () => Promise<void>) {
        const loading = new Loading("Loading...").appendTo(BodyNode);
        if (this.addressOrEns !== addressOrEns) {
            const result = await fetch(`${Config.apiURI}/cached/${addressOrEns}`);
            const str = await result.text();

            this.profile.empty();
            this.content.empty();

            if (str === "") {
                document.title = "Soulink | Page Not Found";
                this.content.append(new NotExistsDisplay());
            } else {

                document.title = `${addressOrEns.indexOf("0x") === 0 ? SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;

                const data = JSON.parse(str);
                this.addressOrEns = addressOrEns;
                this.bio = data.bio;
                this.nfts = data.nfts;

                this.profile.append(
                    this.imageContainer = el(".image-container",
                        new ResponsiveImage("img", "/images/default-profile.png"),
                    ),
                    el(".name", addressOrEns),
                    el(".introduce", this.bio.introduce),
                );

                this.loadBackground();
                this.loadPFP();
                this.showLinkButton(addressOrEns);
            }
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
        if (this.bio.pfp !== undefined && this.imageContainer !== undefined) {
            this.imageContainer.empty();
            this.imageContainer.addClass("loading");
            const metadata: any = await MetadataLoader.loadMetadata(this.bio.pfp.address, this.bio.pfp.tokenId);
            this.imageContainer.append(el("img", { src: metadata?.imageInfo?.cachedURL }));
            this.imageContainer.deleteClass("loading");
        }
    }

    private async showLinkButton(addressOrEns: string) {
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const address = await NetworkProvider.resolveName(addressOrEns);
            if (address !== walletAddress) {

                const isLiked = await SoulinkContract.isLinked(
                    await SoulinkContract.getTokenId(address),
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
                                to: address,
                                deadline,
                            });
                            await fetch(`${Config.apiURI}/request`, {
                                method: "POST",
                                body: JSON.stringify({
                                    requester: walletAddress,
                                    target: address,
                                    signature,
                                    deadline,
                                }),
                            });
                            new Alert("Soulink requested.");
                        },
                    }));
                }

                this.editButton.deleteClass("show");
            } else {
                this.editButton.addClass("show");
            }
        }
    }

    private highlight(uri: string) {
        this.currentLink?.deleteClass("on");
        if (uri.indexOf("/") === -1) {
            this.currentLink = this.links["links"];
        } else {
            uri = uri.substring(uri.indexOf("/") + 1);
            this.currentLink = this.links[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentLink?.addClass("on");
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.highlight(uri);
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}