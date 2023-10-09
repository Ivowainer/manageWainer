export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    exptoken: string;
}

export type UserContextType = {
    registerUser: ({ email, username, password }: Pick<IUser, "email" | "password" | "username">) => IUser;
};
