import express from "express";
import cors from "cors";
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

/*============= CORS =============*/
const whitelist = [process.env.FRONTEND_URL, "*"];
const corsOptions = {
    origin: "*",
    /* function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, */

    credentials: true,
};
app.use(cors(corsOptions));
/* process.env.FRONTEND_URL, optionsSuccessStatus: 200 */
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
