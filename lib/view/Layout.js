"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const NotExistsDisplay_1 = __importDefault(require("../components/NotExistsDisplay"));
const Config_1 = __importDefault(require("../Config"));
class Layout extends skydapp_common_1.View {
    constructor() {
        super();
        this.bio = { links: [] };
        Layout.current = this;
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".layout", this.content = (0, skydapp_browser_1.el)(".content")));
    }
    async ready(addressOrEns) {
        const result = await fetch(`${Config_1.default.apiURI}/bio/${addressOrEns}`);
        const str = await result.text();
        if (str === "") {
            document.title = "Soulink | Page Not Found";
            this.content.empty().append(new NotExistsDisplay_1.default());
            return false;
        }
        else {
            document.title = `${addressOrEns.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(addressOrEns) : addressOrEns} | Soulink`;
            this.bio = JSON.parse(str);
            return true;
        }
    }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map