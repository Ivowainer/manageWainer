import { NextFunction, Request, Response } from "express";

import { isValidToken } from "../helper/tokenJWT";
import { User } from "../models";
import { IUser } from "../types/user.type.js";

const checkAuth = async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded = (await isValidToken(token)) as any;

            req.user = await User.findById(decoded._id).select("-password  -confirmado -token -createdAt -updatedAt -__v");

            return next();
        } catch (error) {
            return res.status(500).json({ msg: "Error in JWT checkAuth" });
        }
    }

    if (!token) {
        return res.status(401).json({ msg: "The token isn't valid" });
    }
};

export default checkAuth;
