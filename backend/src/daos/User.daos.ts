import { User } from "../models";
import { DaosReturnUser, IUser } from "../types/user.type";

export class UserManipulation {
    async createUser(userReq: IUser): Promise<DaosReturnUser> {
        const { email, username, password } = userReq;

        try {
            const userAlreadyExists = await User.findOne({ email }).select("-__v -updatedAt");

            if (userAlreadyExists) {
                throw { codeResponse: 403, message: "User already registered", user: userAlreadyExists };
            }

            const user = new User({
                username,
                email,
                password,
            });

            return { codeResponse: 200, message: "User created successfully!", user };
        } catch (error) {
            throw { codeResponse: 500, message: error };
        }
    }
}
