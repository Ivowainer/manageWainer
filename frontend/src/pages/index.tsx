import { useEffect } from "react";
import { useRouter } from "next/router";

import { getCookie } from "cookies-next";

import LoginForm from "../components/form/LoginForm";

export default function Home() {
    return (
        <main className="flex h-screen w-screen bg-white ">
            <div className="w-2/3 h-full bg-main flex justify-center items-center">
                <p className="text-3xl font-semibold ">
                    The perfect tool to communicate with your <span className="bg-white text-black px-6 py-2">colleagues</span>
                </p>
            </div>
            <LoginForm />
        </main>
    );
}
