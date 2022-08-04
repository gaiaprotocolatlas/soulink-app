import { SkyUtil } from "skydapp-common";
import PFPDisplay from "./components/PFPDisplay";
import Config from "./Config";
import NetworkProvider from "./network/NetworkProvider";

class Utils {

    public async loadShortenName(address: string): Promise<string> {
        const name = await NetworkProvider.lookupAddress(address);
        return name.indexOf("0x") === 0 ? SkyUtil.shortenAddress(name) : name;
    }

    public async loadUser(address: string): Promise<{ pfpDisplay: PFPDisplay, name: string, shortenName: string }> {

        const result = await fetch(`${Config.apiURI}/pfp/${address}`);
        const str = await result.text();
        const data = str === "" ? undefined : JSON.parse(str);

        const name = await NetworkProvider.lookupAddress(address);

        return {
            pfpDisplay: new PFPDisplay(data?.address, data?.tokenId),
            name,
            shortenName: name.indexOf("0x") === 0 ? SkyUtil.shortenAddress(name) : name,
        };
    }
}

export default new Utils();
