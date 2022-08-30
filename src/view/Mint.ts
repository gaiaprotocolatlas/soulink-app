import { utils } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { BodyNode, DomNode, el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Loading from "../components/Loading";
import Config from "../Config";
import DiscountDBContract from "../contracts/DiscountDBContract";
import SoulinkContract from "../contracts/SoulinkContract";
import SoulinkMinterContract from "../contracts/SoulinkMinterContract";
import ERC1155Contract from "../contracts/standards/ERC1155Contract";
import ERC721Contract from "../contracts/standards/ERC721Contract";
import NetworkProvider from "../network/NetworkProvider";
import Wallet from "../network/Wallet";
import Alert from "../popup/Alert";

export default class Mint extends View {

    private container: DomNode;
    private priceDisplay: DomNode;
    private help: DomNode;

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
                        this.help = el("p.help"),
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

        let discountPercent = 0;
        let discountNFT: string | undefined;

        const user = await Wallet.loadAddress();
        if (user !== undefined) {
            const promises: Promise<void>[] = [];
            for (const [address, type] of Object.entries(Config.discountNFTs)) {

                // ERC 721
                if (type === 1) {
                    promises.push((async () => {
                        const balance = await new ERC721Contract(address).balanceOf(user);
                        if (balance.gt(0)) {
                            discountPercent = await DiscountDBContract.getDiscountRate(user, defaultAbiCoder.encode(["address"], [address]));
                            discountNFT = address;
                        }
                    })());
                }

                // ERC 1155
                else if (type === 2) {
                    promises.push((async () => {
                        const balance = await new ERC1155Contract(address).balanceOf(user, 0);
                        if (balance.gt(0)) {
                            discountPercent = await DiscountDBContract.getDiscountRate(user, defaultAbiCoder.encode(["address", "uint256"], [address, 0]));
                            discountNFT = address;
                        }
                    })());
                }
            }
            await Promise.all(promises);
        }

        const price = await SoulinkMinterContract.mintPrice();
        this.priceDisplay.empty().appendText(utils.formatEther(price.mul(10000 - discountPercent).div(10000)));

        if (discountNFT !== undefined) {
            let name = "";
            if (discountNFT === "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb") { name = "CryptoPunks"; }
            if (discountNFT === "0xb48E526d935BEe3891222f6aC10A253e31CCaBE1") { name = "Gaia Protocol Genesis"; }
            if (discountNFT === "0xe7df0DcA32eb23F4182055dC6a2053A3fF239315") { name = "Gaia Protocol Supernova"; }
            if (discountNFT === "0xFfFd676Bffd8797f34C2Adc3E808F374CAEe49D8") { name = "Gaia Protocol Stable DAO"; }
            if (discountNFT === "0xa7298e98362625b65d08bb4c25992c503a0d48db") { name = "The Koreans"; }
            if (discountNFT === "0xDb63fFDc5FE6A6433dC503Fe33108f5057735058") { name = "Project GMGN"; }
            this.help.empty().appendText(`This discount is applied to you because you are own a(an) ${name}.`);
        }
    }

    public close(): void {
        SoulinkContract.off("Transfer", this.tansferHandler);
        clearInterval(this.interval);
        this.container.delete();
        super.close();
    }
}
