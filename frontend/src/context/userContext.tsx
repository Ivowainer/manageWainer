import { createContext, useState, useEffect } from "react";

import { getCookie, setCookie } from "cookies-next";

import { IUser, UserContextType } from "@/@types/user.type";

import { toast } from "react-toastify";
import baseBackendUrl from "@/config/baseBackendUrl";

import type { AxiosResponse } from "axios";

import { useRouter } from "next/router";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { push, pathname } = useRouter();
    const publicRoutes = ["/register", "/"];

    useEffect(() => {
        if (!getCookie("token")) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const currentRoute = pathname;

        if (!isLoggedIn && !publicRoutes.includes(currentRoute)) {
            push("/");
            return;
        }

        if (isLoggedIn && publicRoutes.includes(currentRoute)) {
            push("/projects");
            return;
        }
    }, [push, pathname, isLoggedIn]);

    /* -- */
    const registerUser = async ({ email, username, password }: Pick<IUser, "email" | "password" | "username">) => {
        if (![username, password, email].every(Boolean)) return toast.error("Fill in all the fields");

        const promiseDataResult = baseBackendUrl.post<AxiosResponse<IUser>>("/user/register", { email, username, password });

        const response = await toast.promise(promiseDataResult, {
            pending: "Loading",
            success: {
                render({ data }: any) {
                    setCookie("token", data.data.token);
                    localStorage.setItem("user", JSON.stringify({ username: data.data.user.username, email: data.data.user.email }));
                    return `${data.data.message}`;
                },
                icon: "🟢",
            },
            error: {
                render({ data }: any) {
                    return `${data.response.data.message}`;
                },
                icon: "🔴",
            },
        });

        setIsLoggedIn(true);

        return response;
    };

    const loginUser = async ({ email, password }: Pick<IUser, "email" | "password">) => {
        if (![password, email].every(Boolean)) {
            toast.error("Fill in all the fields");
            return;
        }

        const promiseDataResult = baseBackendUrl.post<AxiosResponse<IUser>>("/user/", { email, password });

        const response = await toast.promise(promiseDataResult, {
            pending: "Loading",
            success: {
                render({ data }: any) {
                    setCookie("token", data.data.token);
                    localStorage.setItem("user", JSON.stringify({ username: data.data.user.username, email: data.data.user.email }));
                    return `${data.data.message}`;
                },
                icon: "🟢",
            },
            error: {
                render({ data }: any) {
                    console.log("hokla");
                    return `${data.response.data.message}`;
                },
                icon: "🔴",
            },
        });

        setIsLoggedIn(true);

        return response;
    };

    return <UserContext.Provider value={{ registerUser, loginUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
