import { DomNode } from "skydapp-browser";
import { View } from "skydapp-common";
export default class BioLinksSetting extends View {
    private container;
    private linkContainer;
    private bar;
    private draggingLink;
    private toIndex;
    constructor();
    private load;
    private showLinks;
    findLinkByY(y: number): {
        link: DomNode;
        top: number;
        height: number;
    } | undefined;
    showBar(top: number): void;
    private hideBar;
    close(): void;
}
//# sourceMappingURL=BioLinksSetting.d.ts.map