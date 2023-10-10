import { jwt, passwordB } from "../helper";

import { User } from "../models";
import { DaosReturnUser, IUser } from "../types/user.type";

export class UserManipulation {
    async createUser(userReq: Omit<IUser, "confirmed" | "exptoken">): Promise<DaosReturnUser> {
        const { email, username, password } = userReq;

        if (![username, password, email].every(Boolean)) {
            throw { codeResponse: 404, message: "User data is missing" };
        }

        try {
            const userAlreadyExists = await User.findOne({ email }).select("-__v -updatedAt");

            if (userAlreadyExists) {
                throw { codeResponse: 403, message: "User already registered" };
            }

            const user = new User({
                username,
                email,
                password,
            });

            await user.save();

            const token = jwt.signToken(user._id, email);

            return { codeResponse: 200, message: "User created successfully!, please check your email inbox", user, token };
        } catch (error: any) {
            console.log(error);
            throw { codeResponse: error.codeResponse, message: error.message };
        }
    }

    async loginUser({ email, password }: Pick<IUser, "email" | "password">): Promise<DaosReturnUser> {
        try {
            const user = await User.findOne({ email }).select("-__v -updatedAt -exptoken -createdAt -updatedAt");

            if (!user) {
                throw { codeResponse: 404, message: "The user doesn't exists" };
            }
            if (user?.confirmed === false) {
                throw { codeResponse: 403, message: "The user aren't confirmed" };
            }

            if (!(await passwordB.verificationPassword(password, user.password))) {
                throw { codeResponse: 401, message: "The password are incorrect" };
            }

            const token = jwt.signToken(user._id, user.email);
            return { codeResponse: 200, message: "Logged in successfully!", user, token };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }
}
