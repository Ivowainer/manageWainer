import { useContext, useMemo, useState } from "react";
import { UserContext } from "@/context/userContext";
import Link from "next/link";

import { validation } from "@/helpers";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { registerUser } = useContext(UserContext)!;

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;

        return validation.isValidEmail(email) ? false : true;
    }, [email]);

    const isInvalidUsername = useMemo(() => {
        return username.length >= 3 || username.length == 0 ? false : true;
    }, [username]);

    const isInvalidPassword = useMemo(() => {
        return password.length >= 6 || password.length == 0 ? false : true;
    }, [password]);

    return (
        <div className="w-1/2 flex flex-col gap-2">
            <p className="text-gray-800 text-4xl font-bold">Register</p>

            <form className="w-full text-gray-600">
                <Input
                    type="text"
                    errorMessage={isInvalidUsername && "Username must contain at least 3 characters"}
                    isInvalid={isInvalidUsername}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="underlined"
                    label="Username"
                    isClearable
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorMessage={isInvalidEmail && "Please enter a valid email"}
                    isInvalid={isInvalidEmail}
                    variant="underlined"
                    label="Email"
                    isClearable
                />
                <Input
                    type="password"
                    errorMessage={isInvalidPassword && "Password must contain at least 6 characters"}
                    isInvalid={isInvalidPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="underlined"
                    label="Password"
                    isClearable
                />
                <Button onClick={() => registerUser({ email, password, username })} className="mt-10 w-full bg-emerald-500 text-white">
                    Register
                </Button>

                <Link href="/" className="text-gray-800 underline">
                    Already have account?
                </Link>
            </form>
        </div>
    );
};
