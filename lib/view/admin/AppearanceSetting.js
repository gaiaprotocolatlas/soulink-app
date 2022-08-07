"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class AppearanceSetting extends skydapp_common_1.View {
    constructor() {
        super();
        this.load();
    }
    async load() {
        await AdminLayout_1.default.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".appearance-setting-view", (0, skydapp_browser_1.el)("input.color", {
                    placeholder: "Color (default: #000000)",
                    value: AdminLayout_1.default.current.bio.color,
                    keyup: (event) => {
                        AdminLayout_1.default.current.bio.color = event.target.value;
                        AdminLayout_1.default.current.checkChanges();
                    },
                })));
            }
        });
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
exports.default = AppearanceSetting;
//# sourceMappingURL=AppearanceSetting.js.map