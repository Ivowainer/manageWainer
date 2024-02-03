import { ITask } from "./task.type";

export interface IProject {
    _id: string;
    creator: string;
    name: string;
    description: string;
    deadline: string;
    client: string;
    website: string;
    tasks: string[];
    collaborators: string[] /*  | IUser[] */;
}

export type ProjectContextType = {
    getProjects: () => void;
    createProject: ({ name, deadline, client, description }: { name: string; deadline: string; client: string; description?: string }) => void;
    deleteProject: (id: string) => void;

    projects: IProject[];
    loading: Boolean;
};
