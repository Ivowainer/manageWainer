import express from "express";
import { ENV_CONFIG } from "./config/env.config";

const app = express();

app.use(express.json());

app.listen(ENV_CONFIG.PORT, () => {
    console.log(`Server running on port ${ENV_CONFIG.PORT}`);
});
