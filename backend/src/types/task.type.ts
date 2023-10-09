import { Types, Document } from "mongoose";

import { DaosReturn } from ".";
import { IProject } from "./project.type";

export interface DaosReturnTask extends DaosReturn {
    task?: ITask;
    taskId?: Types.ObjectId;
}

enum priority {
    "low",
    "medium",
    "high",
}

export interface ITask extends Document {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    status: 0 | 1;
    priority: priority;
    project: IProject;
}
