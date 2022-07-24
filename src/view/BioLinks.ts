import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import NotExistsDisplay from "../components/NotExistsDisplay";
import Config from "../Config";
import Layout from "./Layout";

export default class BioLinks extends View {

    private container: DomNode | undefined;

    constructor(params: ViewParams) {
        super();
        this.load(params.addressOrEns);
    }

    private async load(addressOrEns: string) {
        const result = await fetch(`${Config.apiURI}/bio/${addressOrEns}`);
        const str = await result.text();
        if (this.closed !== true) {
            if (str === "") {
                Layout.current.title = "Page Not Found";
                Layout.current.content.append(this.container = new NotExistsDisplay());
            } else {
                Layout.current.title = addressOrEns;
                Layout.current.content.append(this.container = el(".bio-links-view",
                    "TEST!",
                ));
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
