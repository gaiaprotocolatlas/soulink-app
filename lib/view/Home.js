import { BodyNode, el } from "skydapp-browser";
import { View } from "skydapp-common";
export default class Home extends View {
    container;
    constructor() {
        super();
        BodyNode.append(this.container = el(".home-view", "Rebuilding..."));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=Home.js.map