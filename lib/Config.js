const DEV_MODE = false;
export default DEV_MODE ?
    {
        rpc: "https://cloudflare-eth.com",
        backendHost: "localhost:1223",
    } :
    {
        rpc: "https://cloudflare-eth.com",
        backendHost: "backend.webplus.one",
    };
//# sourceMappingURL=Config.js.map