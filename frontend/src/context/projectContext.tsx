import { createContext, useState, useEffect, useContext } from "react";

import baseBackendUrl from "@/config/baseBackendUrl";

import { IProject, ProjectContextType } from "@/@types/project.type";

import { toast } from "react-toastify";
import { IUser } from "@/@types/user.type";

export const ProjectContext = createContext<ProjectContextType | null>(null);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState(false);

    const [collaborators, setCollaborators] = useState<IUser[]>([])    

    const getProjects = async () => {
        try {
            const { data } = await baseBackendUrl.get("/project");

            setProjects(data.projects);

            setLoading(true);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const getProject = async (id: string) => {
        try {
            const { data } = await baseBackendUrl.get(`/project/${id}`);


            setProject(data.project);
            setLoading(true);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const createProject = async ({ name, deadline, client, description }: { name: string; deadline: string; client: string; description?: string }) => {
        try {
            const { data } = await baseBackendUrl.post("/project", { name, deadline, client, description });

            toast.success(data.message);

            setProjects([...projects, data.project])

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

    /* COLLABORATORS */
    const addCollaborator = async (id: string, username: string) => {
        try {
            const { data } = await baseBackendUrl.post(`/project/${id}/coll`, { username });

            setCollaborators([...collaborators, data.collaborator])

        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const getCollaborators = async (id: string) => {
        try {
            const { data } = await baseBackendUrl(`/project/${id}/coll`);

            setCollaborators(data.collaborators)
            
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const deleteCollaborator = async (id: string, userId: string) => {
        try {
            const { data } = await baseBackendUrl.delete(`/project/${id}/coll/${userId}`);

            const collFiltered = collaborators?.filter(val => val._id != data.collaborator._id);
            setCollaborators(collFiltered)
            toast.success(data.message);

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return <ProjectContext.Provider value={{ getProjects, projects, createProject, loading, deleteProject, project, getProject, getCollaborators, addCollaborator, collaborators, deleteCollaborator }}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext<ProjectContextType | null>(ProjectContext);

export default ProjectProvider;
