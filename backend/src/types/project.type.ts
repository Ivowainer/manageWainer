import { Types, Document } from "mongoose";
import { DaosReturn } from ".";
import { ITask } from "./task.type";
import { IUser } from "./user.type";

export interface DaosReturnProject extends DaosReturn {
    project?: IProject;
    projects?: IProject[];

    collaborators?: IUser[];
    collaborator?: IUser;
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
