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

export type ProjectContextType = {
    getProjects: () => void;
    createProject: ({ name, deadline, client, description }: { name: string; deadline: string; client: string; description?: string }) => void;
    projects: IProject[] | {}[];
    loading: Boolean;
};
