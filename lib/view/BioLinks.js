import { el } from "skydapp-browser";
import { View } from "skydapp-common";
import Layout from "./Layout";
export default class BioLinks extends View {
    container;
    linkContainer;
    constructor(params) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                Layout.current.content.append(this.container = el(".bio-links-view", this.linkContainer = el(".link-container")));
                if (Layout.current.bio.links.length === 0) {
                    this.container.append(el("p.empty", "This Soul has no external links."));
                }
                for (const link of Layout.current.bio.links) {
                    this.linkContainer.append(el("a.link", el(".title", link.title), { href: link.url, target: "_blank" }));
                }
            }
        });
    }
    changeParams(params, uri) {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
//# sourceMappingURL=BioLinks.js.map