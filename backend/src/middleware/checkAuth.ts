import { NextFunction, Response } from "express";

import { isValidToken } from "../helper/tokenJWT";
import { User } from "../models";

const checkAuth = async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies?.token) {
        try {
            token = req.cookies.token;
            const decoded_id = (await isValidToken(token)) as any;

            /* await User.findById(decoded_id).select("-password  -confirmed -exptoken -createdAt -updatedAt -__v") */

            req.user = decoded_id;

            return next();
        } catch (error) {
            res.status(500).json({ message: "Error in JWT checkAuth" });
        }
    }

    if (!token) {
        console.log(req.cookies);
        res.status(401).json({ message: "The token isn't valid" });
    }
};

export default checkAuth;
