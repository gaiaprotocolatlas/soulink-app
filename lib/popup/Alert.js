import { el, Popup } from "skydapp-browser";
export default class Alert extends Popup {
    content;
    constructor(message) {
        super(".popup-background");
        this.append(this.content = el(".alert", el("p", message), el("a", "OK", {
            click: () => this.delete(),
        })));
    }
}
//# sourceMappingURL=Alert.js.map