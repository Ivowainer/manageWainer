import { createContext, useState, useEffect, useContext } from "react";

import { getCookie, setCookie } from "cookies-next";

import { IUser, UserContextType } from "@/@types/user.type";

import { toast } from "react-toastify";
import baseBackendUrl from "@/config/baseBackendUrl";

import type { AxiosResponse } from "axios";

import { Router, useRouter } from "next/router";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const { push, pathname } = useRouter();
    const publicRoutes = ["/register", "/", "/confirm/[exptoken]"];

    useEffect(() => {
        (async () => {
            if(!getCookie("token")){
                setUser(null)
                setIsLoggedIn(false);
                return;
            }
            
            try {
                const { data } = await baseBackendUrl("/user")

                if(!(data?.user.confirmed) && !pathname.includes("/confirm/[exptoken]")){
                    toast.error("You are not confirmed, please check the email")    
                    setIsLoggedIn(false)
                    return;  
                } 

                setUser(data?.user)
                setIsLoggedIn(true)
            } catch (error: any) {
                toast.error(error.response.data.message)

                setIsLoggedIn(false)
            }
            
        })()
    }, [isLoggedIn]);

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
    }, [push, pathname, isLoggedIn, publicRoutes]);

    /* -- */
    const registerUser = async ({ email, username, password }: Pick<IUser, "email" | "password" | "username">) => {
        if (![username, password, email].every(Boolean)) return toast.error("Fill in all the fields");

        const promiseDataResult = baseBackendUrl.post<AxiosResponse<IUser>>("/user/register", { email, username, password });
        
        toast.promise(promiseDataResult, {
            pending: "Loading",
            success: {
                render({ data }: any) {
                    console.log(data);
                    setCookie("token", data.data.token);
                    localStorage.setItem("user", JSON.stringify({ username: data.data.user.username, email: data.data.user.email }));
                    setIsLoggedIn(true);
                    return `${data.data.message}`;
                },
                icon: "🟢",
            },
            error: {
                render({ data }: any) {
                    console.log(data)
                    return `${data.response.data.message}`;
                },
                icon: "🔴",
            },
        });
    };

    const loginUser = async ({ email, password }: Pick<IUser, "email" | "password">) => {
        if (![password, email].every(Boolean)) {
            toast.error("Fill in all the fields");
            return;
        }

        const promise  = baseBackendUrl.post<AxiosResponse<IUser>>("/user/", { email, password }) as any;
        toast.promise(
            promise, {
                pending: "Loading...",
                success: {
                    render({ data }: any){
                        setCookie("token", data.data.token);
                        localStorage.setItem("user", JSON.stringify({ username: data.data.user.username, email: data.data.user.email }));
                        toast.success(data.data.message); 

                        setIsLoggedIn(true);
                        return `Welcome! ${data.data.user.username}`
                    }
                },
                error: {
                    render({ data: { response: { data } }  }: any){
                        return data.message
                    }
                }
            }
        )
    };

    const logout = async () => {
        const promiseDataResult = baseBackendUrl("/user/logout");
        setIsLoggedIn(false);
        setUser(null);
        push("/")
        localStorage.removeItem("user");
        
        await toast.promise(promiseDataResult, {
            pending: "Loading",
            success: {
                render({ data }: any) {
                    return data.data.message;
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
    };

    return <UserContext.Provider value={{ registerUser, loginUser, user, logout, setIsLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext)!;

export default UserProvider;
