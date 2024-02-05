import { ITask } from "./task.type";
import { IUser } from "./user.type";

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

    addCollaborator: (id: string, username: string) => Promise<void>;
    deleteCollaborator: (id: string, userId: string) => Promise<void>;
    getCollaborators: (id: string) => Promise<void>;

    collaborators: IUser[];

    project: IProject | null;
    projects: IProject[];
    loading: Boolean;
};
