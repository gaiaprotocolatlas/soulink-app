import { DomNode } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Bio from "../../datamodel/Bio";
export default class AdminLayout extends View {
    static current: AdminLayout;
    content: DomNode;
    private background;
    private container;
    private pfpContainer;
    private profile;
    private nameDisplay;
    private introduceTextarea;
    address: string;
    private name;
    private prevBio;
    bio: Bio;
    private currentLink;
    private links;
    private saveButton;
    constructor(params: ViewParams, uri: string);
    ready(proc: () => Promise<void>): Promise<void>;
    private loadBackground;
    private loadPFP;
    private save;
    checkChanges(): void;
    private highlight;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=AdminLayout.d.ts.map