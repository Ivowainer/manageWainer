import { useProjectContext } from "@/context/projectContext";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";

interface CardProjectProp {
    name: string;
    description: string;
    website: string;
    deadline: string;
    index: number
    client: string;
    id: string;
}


const CardProject = ({ name, description, website, deadline, index, client, id }: CardProjectProp) => {
    const { projects, deleteProject } = useProjectContext()!;

    return (
        <div className={`flex px-10 justify-between items-center py-5 border-t border-gray-300 w-full bg-gray-100 ${index == 0 && "rounded-t-xl border-none"} ${index == projects.length - 1 && "rounded-b-xl"}`}>
            <div className="flex gap-2 items-center">
                <p className="text-black">{name}</p>
                <p className="text-xs text-gray-400 uppercase">{client}</p>
            </div>
            <div className="flex gap-2">
                <Link href={`/projects/${id}`} className="text-white px-6 py-2 bg-teal-500 rounded-xl">See Project</Link>
                <button onClick={() => deleteProject(id)} className="px-3 py-2 rounded-xl bg-red-500 text-white"><FaRegTrashAlt /></button>
            </div>
        </div>
    );
};

export default CardProject;
