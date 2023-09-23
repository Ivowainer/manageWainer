import { Types } from "mongoose";

import { DaosReturn } from "../types";

const toObjectId = (id: string): Types.ObjectId | DaosReturn => {
    try {
        return new Types.ObjectId(id);
    } catch (error) {
        throw { codeResponse: 404, message: "The ID doesn't valid" };
    }
};

export default toObjectId;
