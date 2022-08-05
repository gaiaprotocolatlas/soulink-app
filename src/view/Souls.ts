import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import SoulDisplay from "../components/SoulDisplay";
import Config from "../Config";
import NetworkProvider from "../network/NetworkProvider";
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

                    const result = await fetch(`${Config.apiURI}/linked/${address}`);
                    const linkedAddresses: string[] = await result.json();

                    for (const address of linkedAddresses) {
                        new SoulDisplay(address, Layout.current.bio.color).appendTo(this.soulList!);
                    }

                    if (this.closed !== true) {
                        loading.delete();
                    }
                })();
            }
        });
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
