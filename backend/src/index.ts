import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ENV_CONFIG, db } from "./config";

const app = express();

app.use(express.json());

app.listen(ENV_CONFIG.PORT, () => {
    console.log(`Server running on port ${ENV_CONFIG.PORT}`);
});
