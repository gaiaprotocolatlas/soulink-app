export default interface Metadata {

    mmsMetadataId: string,

    name: string,
    description?: string,
    external_url?: string,

    image?: string,
    animation_url?: string,

    attributes?: {
        display_type?: string,
        trait_type: string,
        value: any,
    }[],
}