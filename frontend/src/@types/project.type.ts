import { ITask } from "./task.type";

export interface IProject {
    _id: string;
    creator: string;
    name: string;
    description: string;
    deadline: string;
    client: string;
    website: string;
    tasks: ITask[];
    collaborators: string[] /*  | IUser[] */;
}

export type ProjectContextType = {
    getProjects: () => void;
    getProject: (id: string) => void;

    createProject: ({ name, deadline, client, description }: { name: string; deadline: string; client: string; description?: string }) => void;
    deleteProject: (id: string) => void;

    project: IProject | null;
    projects: IProject[];
    loading: Boolean;
};
