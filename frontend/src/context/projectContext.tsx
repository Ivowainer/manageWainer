import { createContext, useState, useEffect, useContext } from "react";

import baseBackendUrl from "@/config/baseBackendUrl";

import { IProject, ProjectContextType } from "@/@types/project.type";

import { toast } from "react-toastify";

export const ProjectContext = createContext<ProjectContextType | null>(null);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
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
            projects?.push(data.project);

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const deleteProject = async (id: string) => {
        try {
            const { data } = await baseBackendUrl.delete(`/project/${id}`);

            const projectsFiltered = projects?.filter(val => val._id != data.project._id);
            setProjects(projectsFiltered)
            toast.success(data.message);

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return <ProjectContext.Provider value={{ getProjects, projects, createProject, loading, deleteProject }}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);

export default ProjectProvider;
