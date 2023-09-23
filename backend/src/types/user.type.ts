import { Types } from "mongoose";

import { DaosReturn } from ".";

export interface DaosReturnUser extends DaosReturn {
    token: string;
    user: IUser;
}

export interface IUser {
    _id?: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    exptoken: string;
}
