import { DomNode, el, SkyRouter } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
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

    private showLinks() {
        if (this.linkContainer !== undefined) {
            this.linkContainer.empty();
            for (const link of AdminLayout.current.bio.links) {
                const linkDisplay = el(".link",
                    el("input", { value: link.title, placeholder: "Title" }, { keyup: (event) => link.title = event.target.value }),
                    el("input", { value: link.url, placeholder: "Url" }, { keyup: (event) => link.url = event.target.value }),
                    el("a", "Delete", {
                        click: () => {
                            SkyUtil.pull(AdminLayout.current.bio.links, link);
                            linkDisplay.delete();
                        },
                    }),
                ).appendTo(this.linkContainer);
            }
        }
    }

    public close(): void {
        this.container?.delete();
    }
}
