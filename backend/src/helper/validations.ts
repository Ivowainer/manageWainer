import { Document, Model, Types } from "mongoose";

export const verifyProjectOwner = async (creator: Types.ObjectId | undefined, userId: Types.ObjectId) => {
    if (creator != userId) {
        throw { codeResponse: 400, message: "You'r not the Owner of this project" };
    }
};

interface MongooseModel<T extends Document> extends Model<T> {}
export const checkDocumentExists = async <T extends Document>(Model: MongooseModel<T>, identifier: string): Promise<T> => {
    const document = await Model.findById(identifier);
    if (!document) {
        throw { codeResponse: 404, message: `${Model.modelName} not found` };
    }
    return document;
};
