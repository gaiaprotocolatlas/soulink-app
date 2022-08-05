import { View, ViewParams } from "skydapp-common";
export default class BusinessCard extends View {
    private container;
    private bookmarkButton;
    private currentAddress;
    constructor(params: ViewParams);
    private load;
    private loadBookmarked;
    changeParams(params: ViewParams, uri: string): void;
    private bookmarkHandler;
    private unbookmarkHandler;
    close(): void;
}
//# sourceMappingURL=BusinessCard.d.ts.map