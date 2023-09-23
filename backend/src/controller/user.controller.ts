import type { Request, Response } from "express";
import { UserManipulation } from "../daos";

const DAOSUserManipulation = new UserManipulation();

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const { codeResponse, message, user, token } = await DAOSUserManipulation.createUser({ username, email, password });

        res.status(codeResponse).json({ message, user, token });
    } catch (error: any) {
        res.status(error.codeResponse).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { codeResponse, message, user, token } = await DAOSUserManipulation.loginUser({ email, password });

        res.status(codeResponse).json({ message, user, token });
    } catch (error: any) {
        res.status(error.codeResponse).json({ message: error.message });
    }
};
