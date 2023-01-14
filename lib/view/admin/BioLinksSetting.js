import { el } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
import AdminLayout from "./AdminLayout";
export default class BioLinksSetting extends View {
    container;
    linkContainer;
    bar;
    emptyMessage;
    toIndex = 0;
    constructor() {
        super();
        this.load();
    }
    async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout.current.content.append(this.container = el(".bio-link-setting-view", this.linkContainer = el(".link-container"), this.bar = el(".bar"), this.emptyMessage = el("p.empty", "This Soul has no external links."), el("a.add", el("i.fa-regular.fa-plus"), {
                    click: () => {
                        AdminLayout.current.bio.links.push({
                            title: "",
                            url: "",
                        });
                        AdminLayout.current.checkChanges();
                        this.showLinks();
                    },
                })));
                this.showLinks();
            }
        });
    }
    showLinks() {
        if (this.linkContainer !== undefined) {
            this.linkContainer.empty();
            for (const link of AdminLayout.current.bio.links) {
                const linkDisplay = el(".link", el("input", { value: link.title, placeholder: "Title" }, { keyup: (event) => { link.title = event.target.value; AdminLayout.current.checkChanges(); } }), el("input", { value: link.url, placeholder: "URL" }, { keyup: (event) => { link.url = event.target.value; AdminLayout.current.checkChanges(); } }), el("a.handle", el("i.fa-solid.fa-grip-dots-vertical"), {
                    mousedown: () => { linkDisplay.domElement.draggable = true; },
                    mouseup: () => { linkDisplay.domElement.draggable = false; },
                    touchstart: () => { linkDisplay.domElement.draggable = true; },
                    touchend: () => { linkDisplay.domElement.draggable = false; },
                }), el("a.delete", el("i.fa-regular.fa-trash-can"), {
                    click: () => {
                        SkyUtil.pull(AdminLayout.current.bio.links, link);
                        AdminLayout.current.checkChanges();
                        linkDisplay.delete();
                    },
                })).appendTo(this.linkContainer);
                linkDisplay.onDom("drag", (event) => {
                    const y = event.clientY;
                    if (y > 0) {
                        const result = this.findLinkByY(y);
                        if (result !== undefined) {
                            const nodeY = result.top + result.height / 2;
                            const index = result.link.parent?.children.indexOf(result.link);
                            if (index !== undefined) {
                                this.toIndex = y < nodeY ? index : index + 1;
                                this.showBar(y < nodeY ? result.top : result.top + result.height);
                            }
                        }
                    }
                });
                linkDisplay.onDom("dragend", () => {
                    if (AdminLayout.current.bio.links.indexOf(link) < this.toIndex) {
                        this.toIndex -= 1;
                    }
                    SkyUtil.pull(AdminLayout.current.bio.links, link);
                    AdminLayout.current.bio.links.splice(this.toIndex, 0, link);
                    AdminLayout.current.checkChanges();
                    this.showLinks();
                    this.hideBar();
                });
            }
            if (this.linkContainer.children.length === 0) {
                this.emptyMessage?.addClass("show");
            }
            else {
                this.emptyMessage?.deleteClass("show");
            }
        }
    }
    findLinkByY(y) {
        if (this.linkContainer !== undefined) {
            for (const link of this.linkContainer.children) {
                const rect = link.rect;
                if (rect.top <= y && y <= rect.top + rect.height) {
                    return { link, top: rect.top, height: rect.height };
                }
            }
        }
    }
    showBar(top) {
        if (this.linkContainer !== undefined) {
            const rect = this.linkContainer.rect;
            this.bar?.style({
                width: rect.width,
                height: 4,
                top,
                left: rect.left,
            });
        }
    }
    hideBar() {
        this.bar?.style({
            left: -999999,
            top: -999999,
        });
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
//# sourceMappingURL=BioLinksSetting.js.map