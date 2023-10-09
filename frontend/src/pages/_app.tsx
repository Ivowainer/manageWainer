import "@/styles/globals.css";
import type { AppProps } from "next/app";

import UserProvider from "../context/userContext";
import { NextUIProvider } from "@nextui-org/react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <UserProvider>
                <ToastContainer />
                <Component {...pageProps} />
            </UserProvider>
        </NextUIProvider>
    );
}
