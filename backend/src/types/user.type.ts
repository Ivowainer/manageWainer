import { DaosReturn } from ".";

export interface DaosReturnUser extends DaosReturn {
    user: IUser;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    exptoken: string;
}
