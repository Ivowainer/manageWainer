import { useEffect } from "react";

import { useProjectContext } from "@/context/projectContext";

import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";

import ModalProject from "@/components/project/ModalProject";
import CardProject from "@/components/project/CardProject";
import MainLayout from "@/components/layout/MainLayout";
import { IProject } from "@/@types/project.type";

const ProjectsPage = () => {
    const { getProjects, loading, projects } = useProjectContext()!;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            {loading ? (
                <MainLayout pageName="Projects" pageDescription="Projects">
                    <main className="w-screen px-24 py-7 flex flex-col gap-3">

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

                        <Button onPress={onOpen} className="bg-emerald-500 text-gray-100 w-1/6">+ Create new project</Button>
                        <ModalProject isOpen={isOpen} onClose={onOpenChange} />

                        <div className={`border border-gray-300 rounded-xl shadow-sm`}>
                            {projects?.map((val: IProject, index: number) => (
                                <CardProject key={val._id} id={val._id} index={index} name={val.name} description={val.description} website={val.website} deadline={val.deadline} client={val.client} />
                            ))}
                        </div>
                    </main>
                </MainLayout>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner color="success" />
                </div>
            )}
        </>
    );
};

export default ProjectsPage;
