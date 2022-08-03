import { BodyNode, DomNode, el, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import SoulinkContract from "../contracts/SoulinkContract";
import Wallet from "../network/Wallet";

export default class Burn extends View {

    private container: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".burn-view",
            el("a", "Burn", {
                click: async () => {
                    const address = await Wallet.loadAddress();
                    if (address !== undefined) {
                        await SoulinkContract.burn(await SoulinkContract.getTokenId(address));
                    }
                },
            }),
        ));
    }

    public close(): void {
        this.container.delete();
    }
}
