import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import Link from "next/link";

const LoginForm = () => {
    return (
        <div className="flex flex-col gap-12 justify-center items-center w-1/3 h-full px-24 bg-gray-200">
            <p className="text-black font-bold text-center text-3xl">Login</p>
            <form className="flex flex-col gap-8 w-full text-gray-600">
                <Input type="email" variant="underlined" label="Email" isClearable />
                <Input type="email" variant="underlined" label="Password" isClearable />
                <Button>Login</Button>
            </form>
            <Link href="/register" className="text-gray-800 underline">
                Are you not registered yet?
            </Link>
        </div>
    );
};

export default LoginForm;
