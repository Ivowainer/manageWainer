import Link from "next/link";
import { useState, useMemo, useContext } from "react";

import { validation } from "@/helpers";
import { UserContext } from "@/context/userContext";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser } = useContext(UserContext)!;

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;

        return validation.isValidEmail(email) ? false : true;
    }, [email]);

    const isInvalidPassword = useMemo(() => {
        return password.length >= 6 || password.length == 0 ? false : true;
    }, [password]);

    return (
        <div className="flex flex-col gap-12 justify-center items-center w-1/3 h-full px-24 bg-gray-200">
            <p className="text-black font-bold text-center text-3xl">Login</p>
            <form className="flex flex-col gap-8 w-full text-gray-600">
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
                <Button onClick={() => loginUser({ email, password })}>Login</Button>
            </form>
            <Link href="/register" className="text-gray-800 underline">
                Are you not registered yet?
            </Link>
        </div>
    );
};

export default LoginForm;
