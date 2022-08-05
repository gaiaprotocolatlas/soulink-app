import { EventContainer } from "skydapp-common";
declare class BookmarkManager extends EventContainer {
    private bookmarkStore;
    all: string[];
    constructor();
    check(address: string): boolean;
    private save;
    bookmark(address: string): void;
    unbookmark(address: string): void;
    toggle(address: string): void;
}
declare const _default: BookmarkManager;
export default _default;
//# sourceMappingURL=BookmarkManager.d.ts.map