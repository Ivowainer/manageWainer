import { useEffect, useContext, useState } from "react";

import { ProjectContext } from "@/context/projectContext";
import { UserContext } from "@/context/userContext";

import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";

import { IProject } from "@/@types/project.type";

import NavBar from "@/components/project/NavBar";
import ModalProject from "@/components/project/ModalProject";
import CardProject from "@/components/project/CardProject";

const ProjectsPage = () => {
    const { getProjects, loading, projects } = useContext(ProjectContext)!;
    const { user } = useContext(UserContext)!;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return (
        // TODO: MAINLAYOUT
        // TODO: SOLUTION UNDEFINED NAME USER.USERNAME
        <div className="bg-gray-200 h-screen w-screen text-black">
            {loading ? (
                <>
                    <NavBar username={user?.username}></NavBar>

                    <main className="w-screen  px-24 py-7 flex flex-col gap-3">
                        <Input
                            classNames={{
                                base: "max-w-full w-full h-11",
                                mainWrapper: "h-full",
                                input: "text-small pl-6",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder="Type to search..."
                            size="sm"
                            type="search"
                        />
                        <Button onPress={onOpen} className="bg-emerald-500 text-gray-100 w-1/6">
                            + Create new project
                        </Button>

                        <ModalProject isOpen={isOpen} onClose={onOpenChange} />

                        {projects.map((val: any) => (
                            <CardProject key={val?.name} name={val.name} description={val.description} website={val.website} deadline={val.deadline} />
                        ))}
                    </main>
                </>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner color="success" />
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
