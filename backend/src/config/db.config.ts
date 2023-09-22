import mongoose from "mongoose";
import { ENV_CONFIG } from "./env.config";

const mongoURI = ENV_CONFIG.CONNECTION_URI;

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error on connection Database:"));

db.once("open", () => {
    console.log("Connection Successfully");
});

export default db;
