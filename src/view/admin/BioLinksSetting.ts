import { DomNode, el } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
import AdminLayout from "./AdminLayout";

export default class BioLinksSetting extends View {

    private container: DomNode | undefined;
    private linkContainer: DomNode | undefined;

    constructor() {
        super();
        this.load();
    }

    private async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout.current.content.append(this.container = el(".bio-link-setting-view",
                    this.linkContainer = el(".link-container"),
                    el("a.add", el("i.fa-solid.fa-plus"), {
                        click: () => {
                            AdminLayout.current.bio.links.push({
                                title: "",
                                url: "",
                            });
                            AdminLayout.current.checkChanges();
                            this.showLinks();
                        },
                    }),
                ));
                this.showLinks();
            }
        });
    }

    private showLinks() {
        if (this.linkContainer !== undefined) {
            this.linkContainer.empty();
            for (const link of AdminLayout.current.bio.links) {
                const linkDisplay = el(".link",
                    el("input", { value: link.title, placeholder: "Title" }, { keyup: (event) => { link.title = event.target.value; AdminLayout.current.checkChanges(); } }),
                    el("input", { value: link.url, placeholder: "URL" }, { keyup: (event) => { link.url = event.target.value; AdminLayout.current.checkChanges(); } }),
                    el("a.handle", el("i.fa-solid.fa-grip-vertical"), {
                        //TODO:
                    }),
                    el("a.delete", el("i.fa-regular.fa-trash-can"), {
                        click: () => {
                            SkyUtil.pull(AdminLayout.current.bio.links, link);
                            AdminLayout.current.checkChanges();
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
