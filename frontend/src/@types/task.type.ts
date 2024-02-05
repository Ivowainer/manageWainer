import { Dispatch, SetStateAction } from "react";
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
    status: boolean;
    priority: priority;
    project: IProject;
    createdAt: string;
}

export type TaskContextType = {
    createTask: ({ title, description, projectId }: { title: string; description: string; priority: string; projectId: string }) => Promise<void>;
    getTasks: (id: string) => void;
    deleteTask: (id: string) => void;

    loading: Boolean;
    tasks: ITask[];
    setLoading: Dispatch<SetStateAction<boolean>>;
    /* setTasks: Dispatch<SetStateAction<ITask[]>>; */
};
