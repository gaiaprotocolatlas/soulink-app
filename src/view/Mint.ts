import { utils } from "ethers";
import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Loading from "../components/Loading";
import SoulinkContract from "../contracts/SoulinkContract";
import SoulinkMinterContract from "../contracts/SoulinkMinterContract";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";
import Alert from "../popup/Alert";

export default class Mint extends View {

    private container: DomNode;
    private priceDisplay: DomNode;

    private interval: any;

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
                            el(".step", "Pre-launch Discount Period"),
                            el(".step.on", "Public Sale"),
                            el(".step", "LFG⚡️"),
                        ),
                        el(".info",
                            el("p.quantity", "Quantity : MAX 1 per wallet : ", el("span", el("b", "1"))),
                            el("p.price", "Price: ", el("span", this.priceDisplay = el("b", "..."), "eth")),
                        ),
                        el("a.mint", "Mint", {
                            click: async () => {
                                const loading = new Loading("Minting...").appendTo(this.container);
                                if (await Wallet.connected() !== true) {
                                    await Wallet.connect();
                                }
                                const address = await Wallet.loadAddress();
                                if (address !== undefined) {
                                    if ((await NetworkProvider.getBalance(address)).lt(await SoulinkMinterContract.mintPrice())) {
                                        new Alert("Not enough ETH to mint");
                                        loading.delete();
                                    } else {
                                        try {
                                            await SoulinkMinterContract.mint(false, "0x");
                                            loading.delete();
                                        } catch (error) {
                                            console.error(error);
                                            SkyRouter.go("/mint/failed", undefined, true);
                                        }
                                    }
                                } else {
                                    loading.delete();
                                }
                            },
                        }),
                        el("p", "Soulink is a soulbound token; this means that once you purchase it, you cannot transfer or sell it to another wallet address."),
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
        SoulinkContract.on("Transfer", this.tansferHandler);

        const check = async () => {
            const address = await Wallet.loadAddress();
            if (address !== undefined) {
                const balance = await SoulinkContract.balanceOf(address);
                if (balance.gt(0)) {
                    SkyRouter.go("/mint/success", undefined, true);
                }
            }
        };
        this.interval = setInterval(check, 15000);
        check();

        this.loadPrice();
    }

    private tansferHandler = async (from: string, to: string) => {
        if (from === "0x0000000000000000000000000000000000000000" && to === await Wallet.loadAddress()) {
            SkyRouter.go("/mint/success", undefined, true);
        }
    };

    private async loadPrice() {
        const price = await SoulinkMinterContract.mintPrice();
        this.priceDisplay.empty().appendText(utils.formatEther(price));
    }

    public close(): void {
        SoulinkContract.off("Transfer", this.tansferHandler);
        clearInterval(this.interval);
        this.container.delete();
        super.close();
    }
}
