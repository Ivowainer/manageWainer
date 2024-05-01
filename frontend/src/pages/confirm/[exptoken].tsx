import baseBackendUrl from "@/config/baseBackendUrl";
import { useUserContext } from "@/context/userContext";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ConfirmPage = () => {
    const {
        query: { exptoken },
        push
    } = useRouter();

    const { user, setIsLoggedIn } = useUserContext() 

    useEffect(() => {
        (async () => {
            if(!getCookie("token")){
                push("/")
                return;
            }
            
            const { data } = await baseBackendUrl(`/user/confirm/${exptoken}`)
            setCookie("token", data.token);

            toast.success(data.message)

            await push("/projects")
        })()
    })

    return exptoken;
};

export default ConfirmPage;
