import type { Request, Response } from "express";
import { UserManipulation } from "../daos";

const DAOSUserManipulation = new UserManipulation();

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const { codeResponse, message, user } = await DAOSUserManipulation.createUser({ username, email, password });

        res.status(codeResponse).json({ message, user });
    } catch (error: any) {
        res.status(error.codeResponse).json({ message: error.message });
    }
};
