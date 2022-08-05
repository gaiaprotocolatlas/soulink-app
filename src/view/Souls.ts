import { DomNode, el, SkyRouter } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Config from "../Config";
import SoulinkContract from "../contracts/SoulinkContract";
import LinkRequest from "../datamodel/LinkRequest";
import NetworkProvider from "../network/NetworkProvider";
import Utils from "../Utils";
import Layout from "./Layout";

export default class Souls extends View {

    private container: DomNode | undefined;
    private soulList: DomNode | undefined;

    constructor(params: ViewParams) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    private async load(addressOrEns: string) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {

                let loading;
                Layout.current.content.append(this.container = el(".souls-view",
                    this.soulList = el(".soul-list"),
                    loading = el(".loading"),
                ));

                (async () => {
                    const address = await NetworkProvider.resolveName(addressOrEns);
                    const promises: Promise<void>[] = [];
                    promises.push(this.loadRequestTo(address));
                    promises.push(this.loadRequestFrom(address));
                    await Promise.all(promises);
                    if (this.closed !== true) {
                        loading.delete();
                    }
                })();
            }
        });
    }

    private async loadRequestTo(address: string) {

        const result = await fetch(`${Config.apiURI}/requestto/${address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {

            const isLiked = await SoulinkContract.isLinked(
                await SoulinkContract.getTokenId(request.requester),
                await SoulinkContract.getTokenId(request.target),
            );
            console.log("TEST!");

            if (isLiked === true) {
                const user = await Utils.loadUser(request.requester);
                if (this.closed !== true) {
                    el(".soul",
                        user.pfpDisplay,
                        el(".name", user.shortenName),
                        { click: () => SkyRouter.go(`/${user.name}`, undefined, true) },
                    ).appendTo(this.soulList!);
                }
            }
        }
    }

    private async loadRequestFrom(address: string) {

        const result = await fetch(`${Config.apiURI}/requestfrom/${address}`);
        const requests: LinkRequest[] = await result.json();

        for (const request of requests) {

            const isLiked = await SoulinkContract.isLinked(
                await SoulinkContract.getTokenId(request.requester),
                await SoulinkContract.getTokenId(request.target),
            );
            console.log("TEST!");

            if (isLiked === true) {
                const user = await Utils.loadUser(request.target);
                if (this.closed !== true) {
                    el(".soul",
                        user.pfpDisplay,
                        el(".name", user.shortenName),
                        { click: () => SkyRouter.go(`/${user.name}`, undefined, true) },
                    ).appendTo(this.soulList!);
                }
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    public close(): void {
        this.container?.delete();
        super.close();
    }
}
