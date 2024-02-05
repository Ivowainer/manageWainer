import { AxiosResponse } from "axios";
export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    exptoken: string;
}

export type UserContextType = {
    registerUser: ({ email, username, password }: Pick<IUser, "email" | "password" | "username">) => any;
    loginUser: ({ email, password }: Pick<IUser, "email" | "password">) => any;
    logout: () => void;
    user: Pick<IUser, "username" | "email" | "_id"> | null;
};
