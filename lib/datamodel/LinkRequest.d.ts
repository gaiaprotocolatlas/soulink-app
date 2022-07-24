export default interface LinkRequest {
    requester: string;
    target: string;
    signature: string;
    deadline: number;
    accept?: {
        signature: string;
        deadline: number;
    };
}
//# sourceMappingURL=LinkRequest.d.ts.map