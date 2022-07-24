import { DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import AdminLayout from "./AdminLayout";

export default class LinkRequests extends View {

    private container: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        if (await AdminLayout.current.ready() === true) {
            if (this.closed !== true) {
                AdminLayout.current.content.append(this.container = el(".container",

                ));
            }
        }
    }

    public close(): void {
        this.container?.delete();
    }
}
