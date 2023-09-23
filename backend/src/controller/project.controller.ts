import { Request, Response } from "express";
import { ProjectManipulation } from "../daos/Project.daos";
import toObjectId from "../helper/mongoType";

const DAOSProjectManipulation = new ProjectManipulation();

export const createProject = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.createProject(req.body, req.user);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
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

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.updateProject(req.user, req.params.projectId, req.body);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};

export const addCollaborator = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.addCollaborator(req.user, req.params.projectId, req.params.userCollId);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};
