import { utils } from "ethers";
import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Loading from "../components/Loading";
import SoulinkContract from "../contracts/SoulinkContract";
import SoulinkMinterContract from "../contracts/SoulinkMinterContract";
import Wallet from "../network/Wallet";

export default class Mint extends View {

    private container: DomNode;
    private priceDisplay: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".mint-view",
            el("header"),
            el("main",
                el("header", "S O U L I N K"),
                el("section",
                    new ResponsiveImage("img", "/images/mint-image.png"),
                    el("section",
                        el("h1", el("b", "Let’s"), " Link!"),
                        el(".stepper",
                            el(".step.on", "Pre-launch Discount Period"),
                            el(".step", "Public Sale"),
                            el(".step", "LFG⚡️"),
                        ),
                        el(".info",
                            el("p.quantity", "Quantity : MAX 1 per wallet : ", el("span", el("b", "1"))),
                            el("p.price", "Price: ", el("span", this.priceDisplay = el("b", "..."), "eth")),
                        ),
                        el("a.mint", "Mint", {
                            click: async () => {
                                try {
                                    new Loading("Minting...").appendTo(this.container);
                                    await SoulinkMinterContract.mint(false, "0x");
                                } catch (error) {
                                    console.error(error);
                                    SkyRouter.go("/mint/failed", undefined, true);
                                }
                            },
                        }),
                        el("p", "It is designed with an SBT token, so once you buy it, you cannot sell is back. It is attached to your crypto wallet."),
                    ),
                ),
            ),
            el("footer",
                el("a", new ResponsiveImage("img", "/images/logo.png"), {
                    click: () => SkyRouter.go("/", undefined, true),
                }),
            ),
        ));

        // when mint
        SoulinkContract.on("Transfer", async (from: string, to: string) => {
            if (from === "0x0000000000000000000000000000000000000000" && to === await Wallet.loadAddress()) {
                SkyRouter.go("/mint/success", undefined, true);
            }
        });

        this.loadPrice();
    }

    private async loadPrice() {
        const price = await SoulinkMinterContract.mintPrice();
        this.priceDisplay.empty().appendText(utils.formatEther(price));
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}
