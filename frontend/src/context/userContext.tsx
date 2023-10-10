import { createContext } from "react";

import { setCookie } from "cookies-next";

import { IUser, UserContextType } from "@/@types/user.type";

import { toast } from "react-toastify";
import baseBackendUrl from "@/config/baseBackendUrl";

import type { AxiosResponse } from "axios";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    /* -- */
    const registerUser = async ({ email, username, password }: Pick<IUser, "email" | "password" | "username">) => {
        if (![username, password, email].every(Boolean)) return toast.error("Fill in all the fields");

        const fetchData = baseBackendUrl.post<AxiosResponse<IUser>>("/user/register", { email, username, password });

        const response = await toast.promise(fetchData, {
            pending: "Loading",
            success: {
                render({ data }: any) {
                    setCookie("token", data.data.token);
                    localStorage.setItem("user", JSON.stringify({ username: data.data.user.username, email: data.data.user.email }));
                    return `${data.data.message}`;
                },
            },
            error: {
                render({ data }: any) {
                    return `${data.response.data.message}`;
                },
                icon: false,
            },
        });

        console.log(response);

        return response;
    };

    return <UserContext.Provider value={{ registerUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
