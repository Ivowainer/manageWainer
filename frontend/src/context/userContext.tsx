import { createContext } from "react";

import { IUser, UserContextType } from "@/@types/user.type";

import { toast } from "react-toastify";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const registerUser = async ({ email, username, password }: Pick<IUser, "email" | "password" | "username">) => {
        if (![username, password, email].every(Boolean)) return toast.error("Fill in all the fields");

        const response = await toast.promise(fetch(process.env.NEXT_PUBLIC_BACKEND_URL), {
            pending: "Promise is pending",
            success: "Promise resolved 👌",
            error: "Promise rejected 🤯",
        });
    };

    return <UserContext.Provider value={{ registerUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
