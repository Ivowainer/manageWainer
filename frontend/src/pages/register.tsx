import { useEffect } from "react";
import { useRouter } from "next/router";

import { getCookie } from "cookies-next";

import { RegisterForm } from "../components/form/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 ">
            <RegisterForm />
        </div>
    );
}
