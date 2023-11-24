import { createContext, useState, useEffect } from "react";

import baseBackendUrl from "@/config/baseBackendUrl";

import { ProjectContextType } from "@/@types/project.type";

import { toast } from "react-toastify";

export const ProjectContext = createContext<ProjectContextType | null>(null);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState([{}]);
    const [loading, setLoading] = useState(false);

    const getProjects = async () => {
        try {
            const { data } = await baseBackendUrl.get("/project");

            setProjects(data.projects);

            setLoading(true);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const createProject = async ({ name, deadline, client, description }: { name: string; deadline: string; client: string; description?: string }) => {
        try {
            const { data } = await baseBackendUrl.post("/project", { name, deadline, client, description });

            toast.success(data.message);
            projects.push(data.project);

            console.log(projects);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return <ProjectContext.Provider value={{ getProjects, projects, createProject, loading }}>{children}</ProjectContext.Provider>;
};

export default ProjectProvider;
