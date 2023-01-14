import { BodyNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import SoulinkContract from "../contracts/SoulinkContract";
import Wallet from "../network/Wallet";
export default class Burn extends View {
    container;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".burn-view", el("a", "Burn", {
            click: async () => {
                const address = await Wallet.loadAddress();
                if (address !== undefined) {
                    await SoulinkContract.burn(await SoulinkContract.getTokenId(address));
                }
            },
        })));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=Burn.js.map