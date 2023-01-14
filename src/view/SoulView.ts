import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import LinkList from "../components/link/LinkList.js";
import NFTImage from "../components/nft/NFTImage.js";
import PFP from "../components/nft/PFP.js";
import Config from "../Config.js";
import Soul from "../datamodel/Soul.js";

export default class SoulView extends View {

    private container: DomNode;

    private background: NFTImage;
    private pfp: PFP;
    private name: DomNode;
    private introduce: DomNode;
    private linkList: LinkList;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".soul-view",
            this.background = new NFTImage(".background"),
            this.pfp = new PFP(),
            this.name = el(".name"),
            this.introduce = el(".introduce"),
            this.linkList = new LinkList(),
        ));
        this.load(params.addressOrName);
    }

    public changeParams(params: ViewParams) {
        this.load(params.addressOrName);
    }

    private async load(addressOrName: string | undefined) {
        if (addressOrName !== undefined) {
            const result = await fetch(`https://${Config.backendHost}/soul/${addressOrName}`);
            if (result.status === 200) {
                const soul: Soul = await result.json();

                if (soul.background !== undefined) { this.background.url = soul.background.url; }
                if (soul.pfp !== undefined) { this.pfp.url = soul.pfp.url; }
                if (soul.links !== undefined) { this.linkList.links = soul.links; }

                this.name.empty().appendText(soul.name ?? addressOrName).style({ color: soul.color });
                this.introduce.empty().appendText(soul.introduce ?? "").style({ color: soul.color });
            }
        }
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}
