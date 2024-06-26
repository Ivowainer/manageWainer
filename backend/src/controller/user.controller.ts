import type { Request, Response } from "express";
import { UserManipulation } from "../daos";

const DAOSUserManipulation = new UserManipulation();

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const { codeResponse, message, user, token } = await DAOSUserManipulation.createUser({ username, email, password });

        res.status(codeResponse).json({ message, user, token });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const confirmUser = async (req: Request, res: Response) => {
    try {
        const { codeResponse, message, user, token } = await DAOSUserManipulation.confirmUser(req.params.exptoken);

        res.status(codeResponse).json({ message, user, token });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { codeResponse, message, user, token } = await DAOSUserManipulation.loginUser({ email, password });

        res.status(codeResponse).json({ message, user, token });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    const { token } = req.cookies;

    try {
        const { codeResponse, message, user } = await DAOSUserManipulation.getProfile(token);

        res.status(codeResponse).json({ message, user, token });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");

        res.status(200).json({ msg: "Logout successfully" });
    } catch (error: any) {
        res.status(error.codeResponse || 500).json({ message: error.message });
    }
};
