"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Loading_1 = __importDefault(require("../../components/Loading"));
const Config_1 = __importDefault(require("../../Config"));
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const Wallet_1 = __importDefault(require("../../network/Wallet"));
const Alert_1 = __importDefault(require("../../popup/Alert"));
const SelectNFTPopup_1 = __importDefault(require("../../popup/SelectNFTPopup"));
class AdminLayout extends skydapp_common_1.View {
    constructor(params, uri) {
        super();
        this.address = ethers_1.constants.AddressZero;
        this.prevBio = { links: [] };
        this.bio = { links: [] };
        this.nfts = [];
        this.links = {};
        AdminLayout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".admin-layout", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)(".menu", this.links["links"] = (0, skydapp_browser_1.el)("a", "Links", { click: () => { skydapp_browser_1.SkyRouter.go("/admin", undefined, true); } })), this.saveButton = (0, skydapp_browser_1.el)("a.save", "Save", { click: () => this.save() })), (0, skydapp_browser_1.el)("main", this.profile = (0, skydapp_browser_1.el)(".profile"), this.content = (0, skydapp_browser_1.el)(".content")), (0, skydapp_browser_1.el)("footer", new skydapp_browser_1.ResponsiveImage("img", "/images/bottom-logo.png"), (0, skydapp_browser_1.el)(".sns", (0, skydapp_browser_1.el)("a", "Twitter", { href: "https://twitter.com/soulinksbt", target: "_blank" }), (0, skydapp_browser_1.el)("a", "Discord", { href: "https://discord.gg/u9hzMr848H", target: "_blank" })))));
        document.title = "Soulink Admin";
        this.highlight(uri);
    }
    async ready(proc) {
        const loading = new Loading_1.default("Loading...").appendTo(skydapp_browser_1.BodyNode);
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
                    const result = await fetch(`${Config_1.default.apiURI}/all/${address}`);
                    const str = await result.text();
                    const data = str === "" ? { bio: { links: [] }, nfts: [] } : JSON.parse(str);
                    this.bio = data.bio;
                    this.nfts = data.nfts;
                    this.prevBio = JSON.parse(JSON.stringify(this.bio));
                    this.address = address;
                    this.profile.append((0, skydapp_browser_1.el)(".pfp", new skydapp_browser_1.ResponsiveImage("img", "/images/default-profile.png"), (0, skydapp_browser_1.el)(".add", (0, skydapp_browser_1.el)("i.fa-solid.fa-plus")), {
                        click: () => new SelectNFTPopup_1.default((contract, tokenId) => {
                            console.log(contract, tokenId);
                        }),
                    }), (0, skydapp_browser_1.el)("input.name", {
                        placeholder: "NAME",
                        value: this.bio.name,
                        keyup: (event) => { this.bio.name = event.target.value; this.checkChanges(); },
                    }));
                    const textarea = (0, skydapp_browser_1.el)("textarea.introduce", this.bio.introduce, {
                        placeholder: "About Me.",
                        keyup: (event) => {
                            this.bio.introduce = event.target.value;
                            this.checkChanges();
                            event.target.style.height = "1px";
                            event.target.style.height = `${event.target.scrollHeight}px`;
                        },
                    }).appendTo(this.profile);
                    textarea.domElement.style.height = "1px";
                    textarea.domElement.style.height = `${textarea.domElement.scrollHeight}px`;
                    await proc();
                }
            }
        }
        loading.delete();
    }
    async save() {
        const signedMessage = await Wallet_1.default.signMessage("Save your changes.");
        await fetch(`${Config_1.default.apiURI}/bio`, {
            method: "POST",
            body: JSON.stringify({ signedMessage, bio: this.bio }),
        });
        this.prevBio = JSON.parse(JSON.stringify(this.bio));
        this.checkChanges();
        new Alert_1.default("Changes Saved!");
    }
    checkChanges() {
        if (JSON.stringify(this.prevBio) !== JSON.stringify(this.bio)) {
            this.saveButton.addClass("on");
        }
        else {
            this.saveButton.deleteClass("on");
        }
    }
    highlight(uri) {
        this.currentLink?.deleteClass("on");
        if (uri === "admin") {
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
    }
}
exports.default = AdminLayout;
//# sourceMappingURL=AdminLayout.js.map