import { BodyNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import LinkList from "../components/link/LinkList.js";
import NFTImage from "../components/nft/NFTImage.js";
import PFP from "../components/nft/PFP.js";
import Config from "../Config.js";
export default class SoulView extends View {
    container;
    background;
    pfp;
    name;
    introduce;
    linkList;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".soul-view", this.background = new NFTImage(".background"), this.pfp = new PFP(), this.name = el(".name"), this.introduce = el(".introduce"), this.linkList = new LinkList()));
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
                if (soul.background !== undefined) {
                    this.background.url = soul.background.url;
                }
                if (soul.pfp !== undefined) {
                    this.pfp.url = soul.pfp.url;
                }
                if (soul.links !== undefined) {
                    this.linkList.links = soul.links;
                }
                this.name.empty().appendText(soul.name ?? addressOrName).style({ color: soul.color });
                this.introduce.empty().appendText(soul.introduce ?? "").style({ color: soul.color });
            }
        }
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=SoulView.js.map