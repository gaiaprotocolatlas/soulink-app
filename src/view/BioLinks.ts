import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Layout from "./Layout";

export default class BioLinks extends View {

    private container: DomNode | undefined;
    private linkContainer: DomNode | undefined;

    constructor(params: ViewParams) {
        super();
        this.load(params.addressOrEns);
    }

    private async load(addressOrEns: string) {
        if (await Layout.current.ready(addressOrEns) === true) {
            if (this.closed !== true) {
                
                Layout.current.content.append(this.container = el(".bio-links-view",
                    this.linkContainer = el(".link-container"),
                ));

                for (const link of Layout.current.bio.links) {
                    this.linkContainer.append(el("a",
                        el(".title", link.title),
                        { href: link.url },
                    ));
                }
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.addressOrEns);
    }

    public close(): void {
        this.container?.delete();
    }
}
