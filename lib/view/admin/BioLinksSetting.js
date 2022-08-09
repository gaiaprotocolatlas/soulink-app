"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class BioLinksSetting extends skydapp_common_1.View {
    constructor() {
        super();
        this.toIndex = 0;
        this.load();
    }
    async load() {
        await AdminLayout_1.default.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".bio-link-setting-view", this.linkContainer = (0, skydapp_browser_1.el)(".link-container"), this.bar = (0, skydapp_browser_1.el)(".bar"), (0, skydapp_browser_1.el)("a.add", (0, skydapp_browser_1.el)("i.fa-regular.fa-plus"), {
                    click: () => {
                        AdminLayout_1.default.current.bio.links.push({
                            title: "",
                            url: "",
                        });
                        AdminLayout_1.default.current.checkChanges();
                        this.showLinks();
                    },
                })));
                this.showLinks();
            }
        });
    }
    showLinks() {
        if (this.linkContainer !== undefined) {
            this.linkContainer.empty();
            for (const link of AdminLayout_1.default.current.bio.links) {
                const linkDisplay = (0, skydapp_browser_1.el)(".link", (0, skydapp_browser_1.el)("input", { value: link.title, placeholder: "Title" }, { keyup: (event) => { link.title = event.target.value; AdminLayout_1.default.current.checkChanges(); } }), (0, skydapp_browser_1.el)("input", { value: link.url, placeholder: "URL" }, { keyup: (event) => { link.url = event.target.value; AdminLayout_1.default.current.checkChanges(); } }), (0, skydapp_browser_1.el)("a.handle", (0, skydapp_browser_1.el)("i.fa-solid.fa-grip-dots-vertical"), {
                    mousedown: () => { linkDisplay.domElement.draggable = true; },
                    mouseup: () => { linkDisplay.domElement.draggable = false; },
                    touchstart: () => { linkDisplay.domElement.draggable = true; },
                    touchend: () => { linkDisplay.domElement.draggable = false; },
                }), (0, skydapp_browser_1.el)("a.delete", (0, skydapp_browser_1.el)("i.fa-regular.fa-trash-can"), {
                    click: () => {
                        skydapp_common_1.SkyUtil.pull(AdminLayout_1.default.current.bio.links, link);
                        AdminLayout_1.default.current.checkChanges();
                        linkDisplay.delete();
                    },
                })).appendTo(this.linkContainer);
                linkDisplay.onDom("drag", (event) => {
                    const y = event.clientY;
                    if (y > 0) {
                        const result = this.findLinkByY(y);
                        if (result !== undefined) {
                            const nodeY = result.top + result.height / 2;
                            const index = result.link.parent?.children.indexOf(result.link);
                            if (index !== undefined) {
                                this.toIndex = y < nodeY ? index : index + 1;
                                this.showBar(y < nodeY ? result.top : result.top + result.height);
                            }
                        }
                    }
                });
                linkDisplay.onDom("dragend", () => {
                    if (AdminLayout_1.default.current.bio.links.indexOf(link) < this.toIndex) {
                        this.toIndex -= 1;
                    }
                    skydapp_common_1.SkyUtil.pull(AdminLayout_1.default.current.bio.links, link);
                    AdminLayout_1.default.current.bio.links.splice(this.toIndex, 0, link);
                    AdminLayout_1.default.current.checkChanges();
                    this.showLinks();
                    this.hideBar();
                });
            }
        }
    }
    findLinkByY(y) {
        if (this.linkContainer !== undefined) {
            for (const link of this.linkContainer.children) {
                const rect = link.rect;
                if (rect.top <= y && y <= rect.top + rect.height) {
                    return { link, top: rect.top, height: rect.height };
                }
            }
        }
    }
    showBar(top) {
        if (this.linkContainer !== undefined) {
            const rect = this.linkContainer.rect;
            this.bar?.style({
                width: rect.width,
                height: 4,
                top,
                left: rect.left,
            });
        }
    }
    hideBar() {
        this.bar?.style({
            left: -999999,
            top: -999999,
        });
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
exports.default = BioLinksSetting;
//# sourceMappingURL=BioLinksSetting.js.map