import { Model, Schema, model, models } from "mongoose";

import { IProject } from "../types/project.type";

const projectModel = new Schema<IProject>(
    {
        creator: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        description: { type: String, default: "This is the default description project" },
        deadline: { type: Date, required: true },
        client: { type: String, required: true },
        collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    },
    {
        timestamps: true,
    }
);

const Project: Model<IProject> = models.Project || model<IProject>("Project", projectModel);

export default Project;
