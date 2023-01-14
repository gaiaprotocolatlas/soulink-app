import { el, ResponsiveImage, SkyRouter } from "skydapp-browser";
import { View } from "skydapp-common";
import SoulDisplay from "../components/SoulDisplay";
import Config from "../Config";
import Layout from "./Layout";
export default class Souls extends View {
    container;
    soulList;
    constructor(params) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                let galaxy;
                let loading;
                Layout.current.content.append(this.container = el(".souls-view", galaxy = el(".galaxy", el("a", new ResponsiveImage("img", "/images/user-galaxy.png"), "View Galaxy", {
                    click: () => SkyRouter.go(`/galaxy/${addressOrEns}`, undefined, true),
                })), this.soulList = el(".soul-list"), loading = el(".loading")));
                galaxy.style({ color: Layout.current.bio.color });
                (async () => {
                    const result = await fetch(`${Config.apiURI}/linked/${Layout.current.currentAddress}`);
                    const linked = await result.json();
                    if (linked.length === 0) {
                        this.container?.append(el("p.empty", "This Soul isn’t Soulinked with anyone yet."));
                    }
                    for (const bio of linked) {
                        new SoulDisplay(bio, Layout.current.bio.color).appendTo(this.soulList);
                    }
                    if (this.closed !== true) {
                        loading.delete();
                    }
                })();
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
//# sourceMappingURL=Souls.js.map