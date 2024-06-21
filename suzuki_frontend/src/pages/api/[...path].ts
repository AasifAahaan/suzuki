
import { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";
const API_URL = process.env.Next_Api_URL;
// console.log("API_URL", API_URL)
const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
const Proxy = (req: IncomingMessage, res: ServerResponse) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true });
};

export default Proxy;
