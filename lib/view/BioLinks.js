"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const NotExistsDisplay_1 = __importDefault(require("../components/NotExistsDisplay"));
const Config_1 = __importDefault(require("../Config"));
const Layout_1 = __importDefault(require("./Layout"));
class BioLinks extends skydapp_common_1.View {
    constructor(params) {
        super();
        this.load(params.addressOrEns);
    }
    async load(addressOrEns) {
        const result = await fetch(`${Config_1.default.apiURI}/bio/${addressOrEns}`);
        const str = await result.text();
        if (this.closed !== true) {
            if (str === "") {
                Layout_1.default.current.title = "Page Not Found";
                Layout_1.default.current.content.append(this.container = new NotExistsDisplay_1.default());
            }
            else {
                Layout_1.default.current.title = addressOrEns;
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".bio-links-view", "TEST!"));
            }
        }
    }
    changeParams(params, uri) {
        this.load(params.addressOrEns);
    }
    close() {
        this.container?.delete();
    }
}
exports.default = BioLinks;
//# sourceMappingURL=BioLinks.js.map