import { BodyNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import LinkList from "../components/link/LinkList.js";
import PFP from "../components/nft/PFP.js";
import Config from "../Config.js";
export default class SoulView extends View {
    container;
    pfp;
    linkList;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".soul-view", this.pfp = new PFP(), this.linkList = new LinkList()));
        this.load(params.addressOrName);
    }
    changeParams(params) {
        this.load(params.addressOrName);
    }
    async load(addressOrName) {
        if (addressOrName !== undefined) {
            const result = await fetch(`https://${Config.backendHost}/soul/${addressOrName}`);
            if (result.status === 200) {
                const soul = await result.json();
                if (soul.pfp !== undefined) {
                    this.pfp.url = soul.pfp.url;
                }
                if (soul.links !== undefined) {
                    this.linkList.links = soul.links;
                }
            }
        }
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=Soul.js.map