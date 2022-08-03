import qrcode from "qrcode";
import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Layout from "./Layout";

export default class BusinessCard extends View {

    private container: DomNode | undefined;

    constructor(params: ViewParams) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    private async load(addressOrEns: string) {
        await Layout.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {

                const qrcodeSrc = await qrcode.toDataURL(`https://soul.ink/${addressOrEns}/card`, {
                    margin: 1,
                    scale: 9,
                });

                Layout.current.content.append(this.container = el(".business-card-view",
                    el("img.qr", { src: qrcodeSrc }),
                ));
            }
        });
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }

    public close(): void {
        this.container?.delete();
        super.close();
    }
}
