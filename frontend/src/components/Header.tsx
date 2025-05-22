import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {
    const location = useLocation()
    return (
        <header className="bg-white py-5 px-5 shadow-md w-full">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                <div className="w-full lg:p-0 py-4 md:w-1/3">
                    <Logo className="w-40 block" />
                </div>
                <nav className="md:w-1/3 md:flex md:justify-end">
                    { location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
                </nav>
            </div>
        </header>
    )
}