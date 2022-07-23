import { View, ViewParams } from "skydapp-common";
import SoulinkContract from "../contracts/SoulinkContract";

export default class Intro implements View {

    constructor() {
        this.load();
    }

    private async load() {
        console.log(await SoulinkContract.name());
    }

    public changeParams(params: ViewParams, uri: string): void {
    }

    public close(): void {
    }
}
