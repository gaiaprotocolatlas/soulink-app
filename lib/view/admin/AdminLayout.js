"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../../components/Loading"));
const NFTDisplay_1 = __importDefault(require("../../components/NFTDisplay"));
const PFPDisplay_1 = __importDefault(require("../../components/PFPDisplay"));
const Config_1 = __importDefault(require("../../Config"));
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const NetworkProvider_1 = __importDefault(require("../../network/NetworkProvider"));
const Wallet_1 = __importDefault(require("../../network/Wallet"));
const Alert_1 = __importDefault(require("../../popup/Alert"));
const SelectNFTPopup_1 = __importDefault(require("../../popup/SelectNFTPopup"));
class AdminLayout extends skydapp_common_1.View {
    constructor(params, uri) {
        super();
        this.address = ethers_1.constants.AddressZero;
        this.name = ethers_1.constants.AddressZero;
        this.prevBio = { links: [] };
        this.bio = { links: [] };
        this.links = {};
        AdminLayout.current = this;
        skydapp_browser_1.BodyNode.append(this.background = (0, skydapp_browser_1.el)(".background-container"), this.container = (0, skydapp_browser_1.el)(".admin-layout", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("a.back", (0, skydapp_browser_1.el)("i.fa-light.fa-arrow-left"), { click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true) }), (0, skydapp_browser_1.el)(".menu", this.links["links"] = (0, skydapp_browser_1.el)("a", "Links", { click: () => { skydapp_browser_1.SkyRouter.go("/me", undefined, true); } }), this.links["souls"] = (0, skydapp_browser_1.el)("a", "Souls", { click: () => { skydapp_browser_1.SkyRouter.go("/my/souls", undefined, true); } }), this.links["appearance"] = (0, skydapp_browser_1.el)("a", "Appearance", { click: () => { skydapp_browser_1.SkyRouter.go("/my/appearance", undefined, true); } })), this.saveButton = (0, skydapp_browser_1.el)("a.save", "Save", { click: () => this.save() })), (0, skydapp_browser_1.el)("main", (0, skydapp_browser_1.el)("a.background", (0, skydapp_browser_1.el)("i.fa-solid.fa-panorama"), {
            click: () => new SelectNFTPopup_1.default(this.bio.background?.address, this.bio.background?.tokenId, async (address, tokenId) => {
                if (address === undefined || tokenId === undefined) {
                    delete this.bio.background;
                }
                else {
                    this.bio.background = { address, tokenId };
                }
                this.checkChanges();
                this.loadBackground();
            }),
        }), this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)("a", new skydapp_browser_1.ResponsiveImage("img", "/images/logo.png"), {
            click: () => skydapp_browser_1.SkyRouter.go("/", undefined, true),
        }))));
        document.title = "My Souls page";
        this.highlight(uri);
    }
    async ready(proc) {
        const loading = new Loading_1.default("Loading...").appendTo(this.container);
        if (this.address !== ethers_1.constants.AddressZero) {
            await proc();
        }
        else {
            let address = await Wallet_1.default.loadAddress();
            if (address === undefined) {
                await Wallet_1.default.connect();
                address = await Wallet_1.default.loadAddress();
            }
            this.profile.empty();
            this.content.empty();
            if (address === undefined) {
                this.content.append((0, skydapp_browser_1.el)("p", "Not connected to wallet."));
            }
            else {
                const balance = await SoulinkContract_1.default.balanceOf(address);
                if (balance.eq(0)) {
                    skydapp_browser_1.SkyRouter.go("/mint", undefined, true);
                }
                else {
                    const result = await fetch(`${Config_1.default.apiURI}/bio/${address}`);
                    const str = await result.text();
                    this.bio = str === "" ? { links: [] } : JSON.parse(str);
                    this.prevBio = JSON.parse(JSON.stringify(this.bio));
                    this.address = address;
                    this.profile.append((0, skydapp_browser_1.el)(".pfp", this.pfpContainer = (0, skydapp_browser_1.el)(".pfp-container"), (0, skydapp_browser_1.el)(".add", (0, skydapp_browser_1.el)("i.fa-regular.fa-plus")), {
                        click: () => new SelectNFTPopup_1.default(this.bio.pfp?.address, this.bio.pfp?.tokenId, async (address, tokenId) => {
                            if (address === undefined || tokenId === undefined) {
                                delete this.bio.pfp;
                            }
                            else {
                                this.bio.pfp = { address, tokenId };
                            }
                            this.checkChanges();
                            this.loadPFP();
                        }),
                    }));
                    this.nameDisplay = (0, skydapp_browser_1.el)(".name").appendTo(this.profile);
                    (async () => {
                        if (this.bio.cachedName !== undefined) {
                            this.name = this.bio.cachedName;
                        }
                        else {
                            const name = await NetworkProvider_1.default.lookupAddress(address);
                            if (name === null) {
                                this.name = address;
                            }
                            else {
                                this.name = name;
                            }
                        }
                        this.nameDisplay?.appendText(this.name.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(this.name) : this.name);
                        this.nameDisplay?.style({ color: AdminLayout.current.bio.color });
                    })();
                    this.introduceTextarea = (0, skydapp_browser_1.el)("textarea.introduce", this.bio.introduce, {
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
                    this.loadBackground();
                    this.loadPFP();
                    await proc();
                }
            }
        }
        loading.delete();
    }
    async loadBackground() {
        this.background.empty();
        if (this.bio.background !== undefined) {
            if (this.bio.cachedBackground !== undefined && this.bio.cachedBackground !== null) {
                this.background.append(new NFTDisplay_1.default(this.bio.cachedBackground));
            }
            else {
                this.background.addClass("loading");
                const result = await fetch(`${Config_1.default.apiURI}/background-loader/${this.bio.background.address}/${this.bio.background.tokenId}`);
                const str = await result.text();
                if (str !== "") {
                    this.background.append(new NFTDisplay_1.default(str));
                }
                this.background.deleteClass("loading");
            }
        }
    }
    async loadPFP() {
        if (this.pfpContainer !== undefined) {
            this.pfpContainer.empty();
            if (this.bio?.pfp === undefined) {
                this.pfpContainer.append(new skydapp_browser_1.ResponsiveImage("img", "/images/default-profile.png"));
            }
            else if (this.bio.cachedPFP !== undefined && this.bio.cachedPFP !== null) {
                this.pfpContainer.append(new PFPDisplay_1.default(this.bio.cachedPFP));
            }
            else {
                this.pfpContainer.addClass("loading");
                const result = await fetch(`${Config_1.default.apiURI}/pfp-loader/${this.bio.pfp.address}/${this.bio.pfp.tokenId}`);
                const str = await result.text();
                if (str !== "") {
                    this.pfpContainer.append(new PFPDisplay_1.default(str));
                }
                this.pfpContainer.deleteClass("loading");
            }
        }
    }
    async save() {
        if (this.address !== await Wallet_1.default.loadAddress()) {
            new Alert_1.default(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${this.address} to continue.`);
        }
        else {
            const signedMessage = await Wallet_1.default.signMessage("Save your changes.");
            const loading = new Loading_1.default("Saving...").appendTo(this.container);
            await fetch(`${Config_1.default.apiURI}/bio`, {
                method: "POST",
                body: JSON.stringify({ signedMessage, bio: this.bio }),
            });
            this.prevBio = JSON.parse(JSON.stringify(this.bio));
            this.checkChanges();
            loading.delete();
            new Alert_1.default("Changes Saved!");
            skydapp_browser_1.SkyRouter.go(`/${this.name}`);
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
exports.default = AdminLayout;
//# sourceMappingURL=AdminLayout.js.map