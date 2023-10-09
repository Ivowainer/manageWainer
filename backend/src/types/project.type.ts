import { Types, Document } from "mongoose";
import { DaosReturn } from ".";
import { ITask } from "./task.type";

export interface DaosReturnProject extends DaosReturn {
    project?: IProject;
    projects?: IProject[];
}

export interface IProject extends Document {
    creator: Types.ObjectId;
    name: string;
    description: string;
    deadline: Date;
    client: string;
    tasks: Types.ObjectId[];
    collaborators: string[] /*  | IUser[] */;
}
