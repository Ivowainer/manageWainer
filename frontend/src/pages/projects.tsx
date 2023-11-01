import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getCookie } from "cookies-next";

import baseBackendUrl from "@/config/baseBackendUrl";

import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

const ProjectsPage = () => {
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(false);

    const { push } = useRouter();

    useEffect(() => {
        if (!getCookie("token")) {
            push("/");
        }
    }, [push]);

    const getProjects = async () => {
        try {
            const data = await baseBackendUrl.get("/project");

            setProjects(data.data.projects);

            setLoading(true);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="bg-gray-200 h-screen w-screen text-black">
            {loading ? (
                /* {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")!).username : null} */
                <div>
                    <h1>Projects of </h1>
                    <p>Projects:</p>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner color="success" />
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
