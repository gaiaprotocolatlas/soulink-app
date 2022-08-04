"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
const PFPDisplay_1 = __importDefault(require("./components/PFPDisplay"));
const Config_1 = __importDefault(require("./Config"));
const NetworkProvider_1 = __importDefault(require("./network/NetworkProvider"));
class Utils {
    async loadShortenName(address) {
        const name = await NetworkProvider_1.default.lookupAddress(address);
        return name.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(name) : name;
    }
    async loadUser(address) {
        const result = await fetch(`${Config_1.default.apiURI}/pfp/${address}`);
        const str = await result.text();
        const data = str === "" ? undefined : JSON.parse(str);
        const name = await NetworkProvider_1.default.lookupAddress(address);
        return {
            pfpDisplay: new PFPDisplay_1.default(data?.address, data?.tokenId),
            name,
            shortenName: name.indexOf("0x") === 0 ? skydapp_common_1.SkyUtil.shortenAddress(name) : name,
        };
    }
}
exports.default = new Utils();
//# sourceMappingURL=Utils.js.map