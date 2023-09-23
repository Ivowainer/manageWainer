import { Request, Response } from "express";
import { ProjectManipulation } from "../daos/Project.daos";

const DAOSProjectManipulation = new ProjectManipulation();

export const createProject = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, project } = await DAOSProjectManipulation.createProject(req.body, req.user._id!);

        res.status(codeResponse).json({ message, project });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};
