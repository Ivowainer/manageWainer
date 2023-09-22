const DEFAULT_PORT = 8000;

const PORT = process.env.PORT || DEFAULT_PORT;
const API_PREFIX = process.env.API_PREFIX || "api";

export const ENV_CONFIG = {
    PORT,
    API_PREFIX,
};
