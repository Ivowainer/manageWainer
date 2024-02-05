import { Model, Schema, model, models } from "mongoose";

import { ITask } from "../types/task.type";

const taskModel = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Boolean, required: true, default: false },
        priority: { type: String, required: true, enum: ["low", "medium", "high"] },
        project: { type: Schema.Types.ObjectId, ref: "Project" },
    },
    {
        timestamps: true,
    }
);

const Task: Model<ITask> = models.Task || model("Task", taskModel);

export default Task;
