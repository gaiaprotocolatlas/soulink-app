import { BigNumber } from "ethers";
import { DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import Loading from "../../components/Loading";
import SoulDisplay from "../../components/SoulDisplay";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import Bio from "../../datamodel/Bio";
import LinkRequest from "../../datamodel/LinkRequest";
import Wallet from "../../network/Wallet";
import Alert from "../../popup/Alert";
import AdminLayout from "./AdminLayout";

export default class SoulsSetting extends View {

    private container: DomNode | undefined;
    private toLinkContainer: DomNode | undefined;
    private toAcceptContainer: DomNode | undefined;
    private linkedContainer: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {

                let loading;
                AdminLayout.current.content.append(this.container = el(".souls-setting-view",
                    this.toLinkContainer = el(".soul-list.to-link-container"),
                    this.toAcceptContainer = el(".soul-list.to-accept-container"),
                    this.linkedContainer = el(".soul-list.linked-container"),
                    loading = el(".loading"),
                ));

                (async () => {
                    const linked = await this.loadLinked();
                    await this.loadRequest(linked);
                    loading.delete();
                })();
            }
        });
    }

    private async loadLinked() {

        const result = await fetch(`${Config.apiURI}/linked/${AdminLayout.current.address}`);
        const bios: Bio[] = await result.json();

        for (const bio of bios) {
            new SoulDisplay(bio, AdminLayout.current.bio.color, el("a.unlink", el("i.fa-light.fa-link-slash"), {
                click: async () => {
                    if (AdminLayout.current.address !== await Wallet.loadAddress()) {
                        new Alert(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout.current.address} to continue.`);
                    } else {
                        await SoulinkContract.breakLink(await SoulinkContract.getTokenId(bio.id!));
                        new Alert("The transaction has been registered. Please wait until it is finished.");
                    }
                },
            })).appendTo(this.linkedContainer!);
        }

        return bios;
    }

    private async loadRequest(linked: Bio[]) {

        const result = await fetch(`${Config.apiURI}/request/${AdminLayout.current.address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {

            if (
                request.accept === undefined &&
                request.requester !== AdminLayout.current.address &&
                linked.find((l) => l.id === request.requester) === undefined
            ) {
                const requestDisplay = new SoulDisplay(request.bio ?? { id: request.requester, links: [] }, AdminLayout.current.bio.color,
                    el("a", el("i.fa-light.fa-check"), {
                        click: async () => {
                            if (AdminLayout.current.address !== await Wallet.loadAddress()) {
                                new Alert(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout.current.address} to continue.`);
                            } else {
                                const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                                const signature = await Wallet.signTypedData(AdminLayout.current.address, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                                    { name: "targetId", type: "uint256" },
                                    { name: "deadline", type: "uint256" },
                                ], {
                                    targetId: request.requester,
                                    deadline,
                                });
                                await fetch(`${Config.apiURI}/accept`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        requester: request.requester,
                                        target: AdminLayout.current.address,
                                        signature,
                                        deadline,
                                    }),
                                });
                                requestDisplay.delete();
                                new Alert("Soulink accepted.");
                            }
                        },
                    }),
                    el("a", el("i.fa-light.fa-xmark"), {
                        click: async () => {
                            if (AdminLayout.current.address !== await Wallet.loadAddress()) {
                                new Alert(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout.current.address} to continue.`);
                            } else {
                                const signedMessage = await Wallet.signMessage("Ignore the request.");
                                const loading = new Loading("Ignoring...").appendTo(this.container!);
                                await fetch(`${Config.apiURI}/ignore`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        signedMessage,
                                        requester: request.requester,
                                        target: AdminLayout.current.address,
                                    }),
                                });
                                loading.delete();
                                requestDisplay.delete();
                                new Alert("Ignored.");
                            }
                        },
                    }),
                ).appendTo(this.toAcceptContainer!);
            }

            else if (
                request.accept !== undefined &&
                request.requester === AdminLayout.current.address &&
                linked.find((l) => l.id === request.target) === undefined
            ) {
                const soulDisplay = new SoulDisplay(request.bio ?? { id: request.target, links: [] }, AdminLayout.current.bio.color, el("a.link", el("i.fa-light.fa-link"), {
                    click: async () => {
                        if (AdminLayout.current.address !== await Wallet.loadAddress()) {
                            new Alert(`Whoa! Looks like you’ve signed in with another account. Please sign back in with ${AdminLayout.current.address} to continue.`);
                        } else {
                            await SoulinkContract.setLink(await SoulinkContract.getTokenId(request.target), [
                                request.signature,
                                request.accept!.signature,
                            ], [
                                request.deadline,
                                request.accept!.deadline,
                            ]);
                            soulDisplay.delete();
                            new Alert("The transaction has been registered. Please wait until it is finished.");
                        }
                    },
                })).appendTo(this.toLinkContainer!);
            }
        }

        if (
            this.toLinkContainer?.children.length === 0 &&
            this.toAcceptContainer?.children.length === 0 &&
            this.linkedContainer?.children.length === 0
        ) {
            this.container?.append(el("p.empty", "This Soul isn’t Soulinked with anyone yet."));
        }
    }

    public close(): void {
        this.container?.delete();
        super.close();
    }
}
