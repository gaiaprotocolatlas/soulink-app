import { DomNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
import SelectNFTPopup from "../../popup/SelectNFTPopup";
import AdminLayout from "./AdminLayout";

export default class AppearanceSetting extends View {

    private container: DomNode | undefined;
    private pfpContainer: DomNode | undefined;
    private backgroundContainer: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout.current.content.append(this.container = el(".container",
                    this.pfpContainer = el(".pfp-container"),
                    el("a", "Change PFP", {
                        click: () => new SelectNFTPopup(() => {

                        }),
                    }),
                    this.backgroundContainer = el(".background-container"),
                ));
                this.showPFP();
                this.showBackground();
            }
        });
    }

    private showPFP() {
        if (this.pfpContainer !== undefined) {

        }
    }

    private showBackground() {
        if (this.backgroundContainer !== undefined) {

        }
    }

    public close(): void {
        this.container?.delete();
    }
}
