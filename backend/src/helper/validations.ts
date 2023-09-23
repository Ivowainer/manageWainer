import { Types } from "mongoose";

export const verifyProjectOwner = async (creator: Types.ObjectId | undefined, userId: Types.ObjectId) => {
    if (creator != userId) {
        throw { codeResponse: 400, message: "You'r not the Owner of this project" };
    }
};
