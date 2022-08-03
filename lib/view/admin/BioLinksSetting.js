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
        this.load();
    }
    async load() {
        await AdminLayout_1.default.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".bio-link-setting-view", this.linkContainer = (0, skydapp_browser_1.el)(".link-container"), (0, skydapp_browser_1.el)("a.add", (0, skydapp_browser_1.el)("i.fa-solid.fa-plus"), {
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
                const linkDisplay = (0, skydapp_browser_1.el)(".link", (0, skydapp_browser_1.el)("input", { value: link.title, placeholder: "Title" }, { keyup: (event) => { link.title = event.target.value; AdminLayout_1.default.current.checkChanges(); } }), (0, skydapp_browser_1.el)("input", { value: link.url, placeholder: "URL" }, { keyup: (event) => { link.url = event.target.value; AdminLayout_1.default.current.checkChanges(); } }), (0, skydapp_browser_1.el)("a.handle", (0, skydapp_browser_1.el)("i.fa-solid.fa-grip-vertical"), {}), (0, skydapp_browser_1.el)("a.delete", (0, skydapp_browser_1.el)("i.fa-regular.fa-trash-can"), {
                    click: () => {
                        skydapp_common_1.SkyUtil.pull(AdminLayout_1.default.current.bio.links, link);
                        AdminLayout_1.default.current.checkChanges();
                        linkDisplay.delete();
                    },
                })).appendTo(this.linkContainer);
            }
        }
    }
    close() {
        this.container?.delete();
    }
}
exports.default = BioLinksSetting;
//# sourceMappingURL=BioLinksSetting.js.map