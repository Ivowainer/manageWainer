import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import { ENV_CONFIG, db } from "./config";

import { Types } from "mongoose";

import { userRoutes, projectRoutes, taskRoutes } from "./routes";

const app = express();

/*============= CONFIG =============*/
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/*============= ROUTES =============*/
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

app.listen(ENV_CONFIG.PORT, () => {
    console.log(`Server running on port ${ENV_CONFIG.PORT}`);
});

declare global {
    namespace Express {
        interface Request {
            user: Types.ObjectId;
        }
    }
}
