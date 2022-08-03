import { BodyNode, DomNode, el, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import SoulinkContract from "../contracts/SoulinkContract";
import SoulinkMinterContract from "../contracts/SoulinkMinterContract";
import Wallet from "../network/Wallet";

export default class Mint extends View {

    private container: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".mint-view",
            el("a", "Mint", {
                click: async () => {
                    await SoulinkMinterContract.mint(false, "0x");
                },
            }),
        ));

        // when mint
        SoulinkContract.on("Transfer", async (from: string, to: string) => {
            if (from === "0x0000000000000000000000000000000000000000" && to === await Wallet.loadAddress()) {
                SkyRouter.go("/admin", undefined, true);
            }
        });
    }

    public close(): void {
        this.container.delete();
    }
}
