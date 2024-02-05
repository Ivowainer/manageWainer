import { createContext, useState, useEffect, useContext } from "react";

import baseBackendUrl from "@/config/baseBackendUrl";

import { toast } from "react-toastify";
import { ITask, TaskContextType } from "@/@types/task.type";

export const TaskContext = createContext<TaskContextType | null>(null);

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    const createTask = async ({ title, description, priority, projectId }: { title: string; description: string, priority: string, projectId: string }) => {
        try {
            const { data } = await baseBackendUrl.post(`/task/${projectId}`, { title, description, priority });
            
            setTasks([...tasks, data.task])

            toast.success(data.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const getTasks = async (id: string) => {
        try {
            setLoading(true)
            const { data } = await baseBackendUrl(`/task/${id}`);
            
            setTasks(data.tasks)
            setLoading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const { data } = await baseBackendUrl.delete(`/task/${id}`);

            const tasksFiltered = tasks?.filter(val => val._id != data.taskId);
            setTasks(tasksFiltered)
            toast.success(data.message);

        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };
   

    return <TaskContext.Provider value={{ tasks, deleteTask, getTasks, createTask, loading, setLoading }}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext<TaskContextType | null>(TaskContext);

export default TaskProvider;
