import { el } from "skydapp-browser";
import { View } from "skydapp-common";
import AdminLayout from "./AdminLayout";
export default class AppearanceSetting extends View {
    container;
    constructor() {
        super();
        this.load();
    }
    async load() {
        await AdminLayout.current.ready(async () => {
            if (this.closed !== true) {
                AdminLayout.current.content.append(this.container = el(".appearance-setting-view", el("input.color", {
                    placeholder: "Color (default: #000000)",
                    value: AdminLayout.current.bio.color,
                    keyup: (event) => {
                        AdminLayout.current.bio.color = event.target.value;
                        AdminLayout.current.checkChanges();
                    },
                })));
            }
        });
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
//# sourceMappingURL=AppearanceSetting.js.map