import { Types } from "mongoose";
import { DaosReturn } from ".";
import { IUser } from "./user.type";

export interface DaosReturnProject extends DaosReturn {
    project?: IProject;
    projects?: IProject[];
}

export interface IProject {
    creator: Types.ObjectId;
    name: string;
    description: string;
    deadline: Date;
    client: string;
    collaborators: string[] /*  | IUser[] */;
}
