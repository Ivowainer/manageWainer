import { useState } from "react";
import Link from "next/link";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="w-1/2 flex flex-col gap-2">
            <p className="text-gray-800 text-4xl font-bold">Register</p>

            <form className="w-full text-gray-600">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} variant="underlined" label="Email" isClearable />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="underlined" label="Password" isClearable />
                <Link href="/projects">
                    <Button className="mt-10 w-full bg-emerald-500 text-white">Register</Button>
                </Link>
            </form>
        </div>
    );
};
