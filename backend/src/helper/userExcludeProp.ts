import { IUser } from "../types/user.type";

export const userExcludePropPassword = (user: IUser) => {
    const newObjectUserExcludePropPassword: Omit<IUser, "password" | "exptoken"> = {
        username: user.username,
        confirmed: user.confirmed,
        email: user.email,
        _id: user._id,
    };

    return newObjectUserExcludePropPassword;
};
