import { ITask } from "./task.type";

export interface IProject extends Document {
    creator: string;
    name: string;
    description: string;
    deadline: Date;
    client: string;
    tasks: string[];
    collaborators: string[] /*  | IUser[] */;
}
