const DEFAULT_PORT = 8000;

const PORT = process.env.PORT || DEFAULT_PORT;
const API_PREFIX = process.env.API_PREFIX || "api";

const CONNECTION_URI = process.env.CONNECTION_URI || "mongodb://localhost/tu_basedatos";

export const ENV_CONFIG = {
    PORT,
    API_PREFIX,
    CONNECTION_URI,
};
