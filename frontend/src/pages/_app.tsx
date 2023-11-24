import "@/styles/globals.css";
import type { AppProps } from "next/app";

import UserProvider from "../context/userContext";
import { NextUIProvider } from "@nextui-org/react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProjectProvider from "@/context/projectContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <UserProvider>
                <ProjectProvider>
                    <ToastContainer />
                    <Component {...pageProps} />
                </ProjectProvider>
            </UserProvider>
        </NextUIProvider>
    );
}
