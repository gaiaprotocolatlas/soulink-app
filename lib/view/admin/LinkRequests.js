"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const AdminLayout_1 = __importDefault(require("./AdminLayout"));
class LinkRequests extends skydapp_common_1.View {
    constructor() {
        super();
        this.load();
    }
    async load() {
        if (await AdminLayout_1.default.current.ready() === true) {
            if (this.closed !== true) {
                AdminLayout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".container"));
            }
        }
    }
    close() {
        this.container?.delete();
    }
}
exports.default = LinkRequests;
//# sourceMappingURL=LinkRequests.js.map