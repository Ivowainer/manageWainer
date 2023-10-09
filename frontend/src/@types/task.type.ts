import { IProject } from "./project.type";

enum priority {
    "low",
    "medium",
    "high",
}

export interface ITask extends Document {
    _id?: string;
    title: string;
    description: string;
    status: 0 | 1;
    priority: priority;
    project: IProject;
}
