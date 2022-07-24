import { DomNode, el, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
import SoulinkContract from "../../contracts/SoulinkContract";
import AdminLayout from "./AdminLayout";

export default class BioLinksSetting extends View {

    private container: DomNode | undefined;
    private linkContainer: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        if (await AdminLayout.current.ready() === true) {
            const balance = await SoulinkContract.balanceOf(AdminLayout.current.address);
            if (balance.eq(0)) {
                if (this.closed !== true) {
                    SkyRouter.go("/mint", undefined, true);
                }
            } else {
                if (this.closed !== true) {
                    AdminLayout.current.content.append(this.container = el(".container",
                        el("a", "Add New Link", {
                            click: () => {
                                AdminLayout.current.bio.links.push({
                                    title: "",
                                    url: "",
                                });
                                this.showLinks();
                            },
                        }),
                        this.linkContainer = el(".link-container"),
                    ));
                    this.showLinks();
                }
            }
        }
    }

    private showLinks() {
        if (this.linkContainer !== undefined) {
            this.linkContainer.empty();
            for (const link of AdminLayout.current.bio.links) {
                this.linkContainer.append(el(".link",
                    el("input", { value: link.title, placeholder: "Title" }),
                    el("input", { value: link.url, placeholder: "Url" }),
                ));
            }
        }
    }

    public close(): void {
        this.container?.delete();
    }
}
