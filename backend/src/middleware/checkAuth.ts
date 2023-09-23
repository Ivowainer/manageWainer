import { NextFunction, Response } from "express";

import { isValidToken } from "../helper/tokenJWT";
import { User } from "../models";

const checkAuth = async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies?.token) {
        try {
            token = req.cookies.token;
            const decoded_id = (await isValidToken(token)) as any;

            req.user = await User.findById(decoded_id).select("-password  -confirmed -exptoken -createdAt -updatedAt -__v");

            return next();
        } catch (error) {
            res.status(500).json({ msg: "Error in JWT checkAuth" });
        }
    }

    if (!token) {
        res.status(401).json({ msg: "The token isn't valid" });
    }
};

export default checkAuth;