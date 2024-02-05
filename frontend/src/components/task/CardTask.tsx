import { ITask } from "@/@types/task.type";
import { useTaskContext } from "@/context/taskContext";
import Link from "next/link";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface ICardProjectProps {
    index: number
    task: ITask
}

const CardProject = ({ index, task }: ICardProjectProps) => {
    const { tasks, deleteTask } = useTaskContext()!

    const date = new Date(task?.createdAt)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      } as Intl.DateTimeFormatOptions;
    
      const dateFormatter = new Intl.DateTimeFormat('en-US', options);
      const formattedDate = dateFormatter.format(date);

    return (
        <div className={`flex px-10 justify-between items-center py-5 border-t border-gray-300 w-full bg-gray-100 ${index == 0 && "rounded-t-xl border-none"} ${index == tasks?.length! - 1 && "rounded-b-xl"}`}>
            <div className="flex flex-col gap-1 ">
                <p className="text-black font-semibold text-xl">{task?.title}</p>
                <p className="text-sm text-gray-500 uppercase">{task?.description}</p>
                <p className="text-xs text-black font-semibold">{formattedDate}</p>
                <p className=" text-gray-700 ">Priority: {task?.priority}</p>
            </div>
            <div className="flex gap-2">
                <button /* onClick={() => deleteProject(id)} */ className="px-3 py-2 rounded-xl bg-gray-500 text-white uppercase">Incomplete</button>
                <button onClick={() => deleteTask(task?._id!)} className="px-3 py-2 rounded-xl bg-red-500 text-white"><FaRegTrashAlt /></button>
            </div>
        </div>
    );
};

export default CardProject;
