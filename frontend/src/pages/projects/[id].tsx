import { useRouter } from "next/router";
import { useEffect } from "react";

import MainLayout from '../../components/layout/MainLayout'
import { useProjectContext } from "@/context/projectContext";
import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";

import CardTask from '../../components/task/CardTask'
import { useTaskContext } from "@/context/taskContext";
import ModalTask from "@/components/task/ModalTask";

const ProjectPage = () => {
    const { query: { id } } = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { tasks, getTasks, loading } = useTaskContext()!
    const { project, getProject } = useProjectContext()!

    useEffect(() => {
        getProject(id as string);
        getTasks(id as string)
    }, [])

    return (
        <>
            {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner color="success" />
                </div>
            ) : (
                <MainLayout pageName="Projects" pageDescription="Projects">
                    <main className="w-screen px-24 py-7 flex flex-col gap-7">
                        <ModalTask isOpen={isOpen} onClose={onOpenChange} />

                        <h1 className="font-bold text-4xl">{project?.name}</h1>

                        <Button onClick={onOpen} className="bg-emerald-500 text-gray-100 w-1/6">+ New Task</Button>

                        <div className="flex flex-col gap-5">
                            <p className="text-xl font-bold text-gray-800">Tasks of the project</p>
                            <div className={`border border-gray-300 rounded-xl shadow-sm`}>
                                {tasks?.map((val, index) => (
                                    <CardTask key={val._id} task={val} index={index} />
                                ))}
                            </div>
                        </div>
                    </main>
                </MainLayout>
            )}
        </>
    );
};

export default ProjectPage;
