import { View, ViewParams } from "skydapp-common";
import NetworkProvider from "../network/NetworkProvider";

export default class BioLinks implements View {

    constructor(params: ViewParams) {
        this.load(params.addressOrEns);
    }

    private async load(addressOrEns: string) {
        const address = await NetworkProvider.resolveName(addressOrEns);
        console.log(address);
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.addressOrEns);
    }

    public close(): void {
    }
}
