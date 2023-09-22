import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ENV_CONFIG, db } from "./config";

import { userRoutes } from "./routes";

const app = express();

/*============= CONFIG =============*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*============= ROUTES =============*/

app.use("/api/user", userRoutes);

app.listen(ENV_CONFIG.PORT, () => {
    console.log(`Server running on port ${ENV_CONFIG.PORT}`);
});
