import { emailSender, jwt, passwordB, userExcludeProp } from "../helper";

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

            const exptoken = jwt.signExpToken(email);

            const user = new User({
                username,
                email,
                password,
                exptoken,
            });

            await emailSender.emailSender(email, exptoken);

            await user.save();

            const token = jwt.signToken(user._id, email);

            return { codeResponse: 200, message: "User created successfully!, please check your email inbox", user: userExcludeProp.userExcludePropPassword(user), token };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse, message: error.message };
        }
    }

    async confirmUser(token: string): Promise<DaosReturnUser> {
        try {
            const user = await User.findOne({ exptoken: token }).select("-__v -updatedAt");

            if (!user) throw { codeResponse: 403, message: "The expToken doesn't exists" };

            user.exptoken = "";
            user.confirmed = true;

            const new_token = jwt.signToken(user._id, user.email);

            await user.save();
            return { codeResponse: 200, message: "User successfully confirmed!", user: userExcludeProp.userExcludePropPassword(user), token: new_token };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse, message: error.message };
        }
    }

    async loginUser({ email, password }: Pick<IUser, "email" | "password">): Promise<DaosReturnUser> {
        try {
            const user = await User.findOne({ email }).select("-__v -updatedAt -exptoken -createdAt -updatedAt");

            if (!user) throw { codeResponse: 404, message: "The user doesn't exists" };

            if (user?.confirmed == false) throw { codeResponse: 403, message: "The user isn't confirmed" };

            if (!(await passwordB.verificationPassword(password, user.password))) {
                throw { codeResponse: 401, message: "The password are incorrect" };
            }

            const token = jwt.signToken(user._id, user.email);
            return { codeResponse: 200, message: "Logged in successfully!", user: userExcludeProp.userExcludePropPassword(user), token };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }

    async getProfile(token: string): Promise<DaosReturnUser> {
        try {
            const tokenUser = await jwt.isValidToken(token);
            const user = await User.findById(tokenUser).select("-__v -updatedAt -exptoken -createdAt -updatedAt");

            if (!user) throw { codeResponse: 404, message: "The user doesn't exists" };

            return { codeResponse: 200, message: "User Profile", token, user: userExcludeProp.userExcludePropPassword(user) };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }
}
