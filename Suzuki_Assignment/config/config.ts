import { config as conf } from "dotenv";
conf();

const _config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    env: process.env.NODE_ENV,
    ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS,
}

export const config = Object.freeze(_config)