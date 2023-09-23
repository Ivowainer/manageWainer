import { Model, Schema, model, models } from "mongoose";

import { IProject } from "../types/project.type";

const projectModel = new Schema(
    {
        creator: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        description: { type: String, default: "This is the default description project" },
        deadline: { type: Date, required: true },
        client: { type: String },
        collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

const Project: Model<IProject> = models.Project || model("Project", projectModel);

export default Project;
