import PFPDisplay from "./components/PFPDisplay";
declare class Utils {
    loadUser(address: string): Promise<{
        pfpDisplay: PFPDisplay;
        name: string;
        shortenName: string;
    }>;
}
declare const _default: Utils;
export default _default;
//# sourceMappingURL=Utils.d.ts.map