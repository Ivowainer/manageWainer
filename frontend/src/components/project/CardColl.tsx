import { IUser } from "@/@types/user.type";
import { useProjectContext } from "@/context/projectContext";
import { FaRegTrashAlt } from "react-icons/fa";

const CardColl = ({ user, index }: { user: IUser, index: number }) => {
    const { collaborators, deleteCollaborator, project } = useProjectContext()!;

    return (
        <div className={`flex px-10 justify-between items-center py-5 border-t border-gray-300 w-full bg-gray-100 ${index == 0 && "rounded-t-xl border-none"} ${index == collaborators?.length! - 1 && "rounded-b-xl"}`}>
            <div className="flex flex-col gap-1 ">
                <p className="text-gray-800 font-semibold ">{user?.username}</p>
                <p className="text-grayu-600 text-sm">{user?.email}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => deleteCollaborator(project?._id!, user?._id!)} className="px-3 py-2 rounded-xl bg-red-500 text-white"><FaRegTrashAlt /></button>
            </div>
        </div>
    );
}

export default CardColl