import { constants } from "ethers";
import { BodyNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
import Loading from "../../components/Loading";
import NFTDisplay from "../../components/NFTDisplay";
import PFPDisplay from "../../components/PFPDisplay";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import NetworkProvider from "../../network/NetworkProvider";
import Wallet from "../../network/Wallet";
import Alert from "../../popup/Alert";
import SelectNFTPopup from "../../popup/SelectNFTPopup";
export default class AdminLayout extends View {
    static current;
    content;
    background;
    container;
    pfpContainer;
    profile;
    nameDisplay;
    introduceTextarea;
    address = constants.AddressZero;
    name = constants.AddressZero;
    prevBio = { links: [] };
    bio = { links: [] };
    currentLink;
    links = {};
    saveButton;
    constructor(params, uri) {
        super();
        AdminLayout.current = this;
        BodyNode.append(this.background = el(".background-container"), this.container = el(".admin-layout", el("header", el("a.back", el("i.fa-light.fa-arrow-left"), { click: () => history.back() }), el(".menu", this.links["links"] = el("a", "Links", { click: () => { SkyRouter.go("/me", undefined, true); } }), this.links["souls"] = el("a", "Souls", { click: () => { SkyRouter.go("/my/souls", undefined, true); } }), this.links["appearance"] = el("a", "Appearance", { click: () => { SkyRouter.go("/my/appearance", undefined, true); } })), this.saveButton = el("a.save", "Save", { click: () => this.save() })), el("main", el("a.background", el("i.fa-solid.fa-panorama"), {
            click: () => new SelectNFTPopup(this.bio.background?.address, this.bio.background?.tokenId, async (address, tokenId) => {
                if (address === undefined || tokenId === undefined) {
                    delete this.bio.background;
                }
                else {
                    this.bio.background = { address, tokenId };
                }
                this.checkChanges();
                this.loadBackground(true);
            }),
        }), this.profile = el(".profile"), this.content = el(".content")), el("footer", el("a", new ResponsiveImage("img", "/images/logo.png"), {
            click: () => SkyRouter.go("/", undefined, true),
        }))));
        document.title = "My Souls page";
        this.highlight(uri);
    }
    async ready(proc) {
        const loading = new Loading("Loading...").appendTo(this.container);
        if (this.address !== constants.AddressZero) {
            await proc();
        }
        else {
            let address = await Wallet.loadAddress();
            if (address === undefined) {
                await Wallet.connect();
                address = await Wallet.loadAddress();
            }
            this.profile.empty();
            this.content.empty();
            if (address === undefined) {
                this.content.append(el("p", "Not connected to wallet."));
            }
            else {
                const balance = await SoulinkContract.balanceOf(address);
                if (balance.eq(0)) {
                    SkyRouter.go("/mint", undefined, true);
                }
                else {
                    const result = await fetch(`${Config.apiURI}/bio/${address}`);
                    const str = await result.text();
                    this.bio = str === "" ? { links: [] } : JSON.parse(str);
                    this.prevBio = JSON.parse(JSON.stringify(this.bio));
                    this.address = address;
                    this.profile.append(el(".pfp", this.pfpContainer = el(".pfp-container"), el(".add", el("i.fa-regular.fa-plus")), {
                        click: () => new SelectNFTPopup(this.bio.pfp?.address, this.bio.pfp?.tokenId, async (address, tokenId) => {
                            if (address === undefined || tokenId === undefined) {
                                delete this.bio.pfp;
                            }
                            else {
                                this.bio.pfp = { address, tokenId };
                            }
                            this.checkChanges();
                            this.loadPFP(true);
                        }),
                    }));
                    this.nameDisplay = el(".name").appendTo(this.profile);
                    (async () => {
                        if (this.bio.cachedName !== undefined) {
                            this.name = this.bio.cachedName;
                        }
                        else {
                            const name = await NetworkProvider.lookupAddress(address);
                            if (name === null) {
                                this.name = address;
                            }
                            else {
                                this.name = name;
                            }
                        }
                        this.nameDisplay?.appendText(this.name.indexOf("0x") === 0 ? SkyUtil.shortenAddress(this.name) : this.name);
                        this.nameDisplay?.style({ color: AdminLayout.current.bio.color });
                    })();
                    this.introduceTextarea = el("textarea.introduce", this.bio.introduce, {
                        placeholder: "About Me.",
                        keyup: (event) => {
                            this.bio.introduce = event.target.value;
                            this.checkChanges();
                            event.target.style.height = "1px";
                            event.target.style.height = `${event.target.scrollHeight}px`;
                        },
                    }).appendTo(this.profile);
                    this.introduceTextarea.style({ color: AdminLayout.current.bio.color });
                    this.introduceTextarea.domElement.style.height = "1px";
                    this.introduceTextarea.domElement.style.height = `${this.introduceTextarea.domElement.scrollHeight}px`;
                    this.loadBackground(false);
                    this.loadPFP(false);
                    await proc();
                }
            }
        }
        loading.delete();
    }
    async loadBackground(force) {
        this.background.empty();
        if (this.bio.background !== undefined) {
            if (force !== true && this.bio.cachedBackground !== undefined && this.bio.cachedBackground !== null) {
                this.background.append(new NFTDisplay(this.bio.cachedBackground));
            }
            else {
                this.background.addClass("loading");
                const result = await fetch(`${Config.apiURI}/background-loader/${this.bio.background.address}/${this.bio.background.tokenId}`);
                const str = await result.text();
                if (str !== "") {
                    this.background.append(new NFTDisplay(str));
                }
                this.background.deleteClass("loading");
            }
        }
    }
    async loadPFP(force) {
        if (this.pfpContainer !== undefined) {
            this.pfpContainer.empty();
            if (this.bio?.pfp === undefined) {
                this.pfpContainer.append(new ResponsiveImage("img", "/images/default-profile.png"));
            }
            else if (force !== true && this.bio.cachedPFP !== undefined && this.bio.cachedPFP !== null) {
                this.pfpContainer.append(new PFPDisplay(this.bio.cachedPFP));
            }
            else {
                this.pfpContainer.addClass("loading");
                const result = await fetch(`${Config.apiURI}/pfp-loader/${this.bio.pfp.address}/${this.bio.pfp.tokenId}`);
                const str = await result.text();
                if (str !== "") {
                    this.pfpContainer.append(new PFPDisplay(str));
                }
                this.pfpContainer.deleteClass("loading");
            }
        }
    }
    async save() {
        if (this.address !== await Wallet.loadAddress()) {
            new Alert(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${this.address} to continue.`);
        }
        else {
            const signedMessage = await Wallet.signMessage("Save your changes.");
            const loading = new Loading("Saving...").appendTo(this.container);
            await fetch(`${Config.apiURI}/bio`, {
                method: "POST",
                body: JSON.stringify({ address: this.address, signedMessage, bio: this.bio }),
            });
            this.prevBio = JSON.parse(JSON.stringify(this.bio));
            this.checkChanges();
            loading.delete();
            new Alert("Changes Saved!");
            SkyRouter.go(`/${this.name}`);
        }
    }
    checkChanges() {
        if (JSON.stringify(this.prevBio) !== JSON.stringify(this.bio)) {
            this.saveButton.addClass("on");
            this.nameDisplay?.style({ color: AdminLayout.current.bio.color });
            this.introduceTextarea?.style({ color: AdminLayout.current.bio.color });
        }
        else {
            this.saveButton.deleteClass("on");
        }
    }
    highlight(uri) {
        this.currentLink?.deleteClass("on");
        if (uri === "me") {
            this.currentLink = this.links["links"];
        }
        else {
            this.currentLink = this.links[uri.substring(uri.indexOf("/") + 1)];
        }
        this.currentLink?.addClass("on");
    }
    changeParams(params, uri) {
        this.highlight(uri);
    }
    close() {
        this.container.delete();
        this.background.delete();
        super.close();
    }
}
//# sourceMappingURL=AdminLayout.js.map