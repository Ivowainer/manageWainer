import { Request, Response } from "express";

import { TaskManipulation } from "../daos/Task.daos";

const DAOSTaskManipulation = new TaskManipulation();

export const createTask = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, task } = await DAOSTaskManipulation.createTask(req.user, req.params.projectId, req.body);

        res.status(codeResponse).json({ message, task });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, task } = await DAOSTaskManipulation.updateTask(req.user, req.params.taskId, req.body);

        res.status(codeResponse).json({ message, task });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, taskId } = await DAOSTaskManipulation.deleteTask(req.user, req.params.taskId);

        res.status(codeResponse).json({ message, taskId });
    } catch (error: any) {
        res.status(error.codeResponse | 500).json({ message: error.message });
    }
};
