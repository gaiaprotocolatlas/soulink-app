
const DEV_MODE = false;

export default DEV_MODE ?

    // for development
    {
        rpc: "https://cloudflare-eth.com",
        backendHost: "localhost:1223",
    } :

    // for production
    {
        rpc: "https://cloudflare-eth.com",
        backendHost: "backend.webplus.one",
    }
