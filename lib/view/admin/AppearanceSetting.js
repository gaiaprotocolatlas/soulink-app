"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const SelectNFTPopup_1 = __importDefault(require("../../popup/SelectNFTPopup"));
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class AppearanceSetting extends skydapp_common_1.View {
    constructor() {
        super();
        this.load();
    }
    async load() {
        await AdminLayout_1.default.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".container", this.pfpContainer = (0, skydapp_browser_1.el)(".pfp-container"), (0, skydapp_browser_1.el)("a", "Change PFP", {
                    click: () => new SelectNFTPopup_1.default(() => {
                    }),
                }), this.backgroundContainer = (0, skydapp_browser_1.el)(".background-container")));
                this.showPFP();
                this.showBackground();
            }
        });
    }
    showPFP() {
        if (this.pfpContainer !== undefined) {
        }
    }
    showBackground() {
        if (this.backgroundContainer !== undefined) {
        }
    }
    close() {
        this.container?.delete();
    }
}
exports.default = AppearanceSetting;
//# sourceMappingURL=AppearanceSetting.js.map