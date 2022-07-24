"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const SoulinkContract_1 = __importDefault(require("../../contracts/SoulinkContract"));
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class BioLinksSetting extends skydapp_common_1.View {
    constructor() {
        super();
        this.load();
    }
    async load() {
        if (await AdminLayout_1.default.current.ready() === true) {
            const balance = await SoulinkContract_1.default.balanceOf(AdminLayout_1.default.current.address);
            if (balance.eq(0)) {
                if (this.closed !== true) {
                    skydapp_browser_1.SkyRouter.go("/mint", undefined, true);
                }
            }
            else {
                if (this.closed !== true) {
                    AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".container", (0, skydapp_browser_1.el)("a", "Add New Link", {
                        click: () => {
                            AdminLayout_1.default.current.bio.links.push({
                                title: "",
                                url: "",
                            });
                            this.showLinks();
                        },
                    }), this.linkContainer = (0, skydapp_browser_1.el)(".link-container")));
                    this.showLinks();
                }
            }
        }
    }
    showLinks() {
        if (this.linkContainer !== undefined) {
            this.linkContainer.empty();
            for (const link of AdminLayout_1.default.current.bio.links) {
                this.linkContainer.append((0, skydapp_browser_1.el)(".link", (0, skydapp_browser_1.el)("input", { value: link.title, placeholder: "Title" }, { keyup: (event) => link.title = event.target.value }), (0, skydapp_browser_1.el)("input", { value: link.url, placeholder: "Url" }, { keyup: (event) => link.url = event.target.value })));
            }
        }
    }
    close() {
        this.container?.delete();
    }
}
exports.default = BioLinksSetting;
//# sourceMappingURL=BioLinksSetting.js.map