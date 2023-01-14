import { DomNode, el, Popup } from "skydapp-browser";

export default class Alert extends Popup {

    public content: DomNode;

    constructor(message: string) {
        super(".popup-background");
        this.append(
            this.content = el(".alert",
                el("p", message),
                el("a", "OK", {
                    click: () => this.delete(),
                }),
            ),
        );
    }
}
