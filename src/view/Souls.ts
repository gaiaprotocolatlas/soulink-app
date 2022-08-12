import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import SoulDisplay from "../components/SoulDisplay";
import Config from "../Config";
import Bio from "../datamodel/Bio";
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

                    const result = await fetch(`${Config.apiURI}/linked/${Layout.current.currentAddress}`);
                    const linked: Bio[] = await result.json();

                    if (linked.length === 0) {
                        this.container?.append(el("p.empty", "This Soul isn’t Soulinked with anyone yet."));
                    }

                    for (const bio of linked) {
                        new SoulDisplay(bio, Layout.current.bio.color).appendTo(this.soulList!);
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
