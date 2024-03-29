import { Request, Response } from "express";
import { ProjectManipulation } from "../daos/Project.daos";

const DAOSProjectManipulation = new ProjectManipulation();

export const createProject = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.createProject(req.body, req.user);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, projects } = await DAOSProjectManipulation.getProjects(req.user);

        res.status(codeResponse).json({ message, projects });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};

export const getProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.getProject(req.user, projectId);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.updateProject(req.user, req.params.projectId, req.body);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.deleteProject(req.user, req.params.projectId);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const getCollaborators = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, collaborators } = await DAOSProjectManipulation.getCollaborators(req.user, req.params.projectId);

        res.status(codeResponse).json({ message, collaborators });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const addCollaborator = async (req: Request, res: Response) => {
    const { username } = req.body;

    try {
        const { codeResponse, message, collaborator } = await DAOSProjectManipulation.addCollaborator(req.user, req.params.projectId, username);

        res.status(codeResponse).json({ message, collaborator });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const removeCollaborator = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, collaborator } = await DAOSProjectManipulation.removeCollaborator(req.user, req.params.projectId, req.params.userCollId);

        res.status(codeResponse).json({ message, collaborator });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};
