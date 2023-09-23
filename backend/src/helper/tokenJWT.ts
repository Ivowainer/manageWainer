import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const signToken = (_id: Types.ObjectId, email: string) => {
    if (!process.env.JWT_SECRET_SEED) throw { codeResponse: 500, message: "Doesn't exists JWT SEED ENV variable" };

    // Payload, seed, Opciones
    return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: "30d" });
};

export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) throw { codeResponse: 500, message: "Doesn't exists JWT SEED ENV variable" };

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
                if (err) return reject("JWT is not valid");

                const { _id } = payload as { _id: string };

                resolve(_id);
            });
        } catch (error) {
            reject("JWT is not valid");
        }
    });
};
