import { DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import Config from "../../Config";
import SoulinkContract from "../../contracts/SoulinkContract";
import LinkRequest from "../../datamodel/LinkRequest";
import Wallet from "../../network/Wallet";
import AdminLayout from "./AdminLayout";

export default class LinkRequests extends View {

    private container: DomNode | undefined;
    private requestToContainer: DomNode | undefined;
    private requestFromContainer: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout.current.content.append(this.container = el(".container",
                    this.requestToContainer = el(".request-to-container"),
                    this.requestFromContainer = el(".request-from-container"),
                ));
                this.loadRequestTo();
                this.loadRequestFrom();
            }
        });
    }

    private async loadRequestTo() {

        const result = await fetch(`${Config.apiURI}/requestto/${AdminLayout.current.address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {
            el(".request",
                el("", request.requester),
                el("a", "Accept", {
                    click: async () => {
                        const deadline = Math.floor(Date.now() / 1000) + 315360000; // +10년
                        const signature = await Wallet.signTypedData(AdminLayout.current.address, "Soulink", "1", SoulinkContract.address, "RequestLink", [
                            { name: "to", type: "address" },
                            { name: "deadline", type: "uint256" },
                        ], {
                            to: request.requester,
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
                    },
                }),
            ).appendTo(this.requestToContainer!);
        }
    }

    private async loadRequestFrom() {

        const result = await fetch(`${Config.apiURI}/requestfrom/${AdminLayout.current.address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {

            const isLiked = await SoulinkContract.isLinked(
                await SoulinkContract.getTokenId(request.requester),
                await SoulinkContract.getTokenId(request.target),
            );

            if (isLiked === true) {
                fetch(`${Config.apiURI}/removelinked`, {
                    method: "POST",
                    body: JSON.stringify({
                        requester: request.requester,
                        target: request.target,
                    }),
                })
            } else {

                el(".request",
                    el("", request.requester),
                    request.accept === undefined ? undefined : el("a", "Link Soul", {
                        click: async () => {
                            await SoulinkContract.setLink(await SoulinkContract.getTokenId(request.target), [
                                request.signature,
                                request.accept!.signature,
                            ], [
                                request.deadline,
                                request.accept!.deadline,
                            ]);
                        },
                    }),
                ).appendTo(this.requestToContainer!);
            }
        }
    }

    public close(): void {
        this.container?.delete();
    }
}
