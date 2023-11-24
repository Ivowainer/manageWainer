import { UserContext } from "@/context/userContext";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useContext } from "react";

interface NavBarProps {
    username: string;
}

const NavBar = ({ username }: NavBarProps) => {
    const { logout } = useContext(UserContext)!;

    return (
        <nav className="px-16 py-4 flex justify-between border-b border-gray-300 text-lg">
            <Link href="/projects" className="font-bold">
                Wainer<span className="text-emerald-500">Manager</span>
            </Link>
            <div className="flex items-center gap-2 justify-center">
                <p className="text-emerald-600">{`Hi! ${username}`}</p>
                <Button onClick={logout} className="text-sm ">
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
