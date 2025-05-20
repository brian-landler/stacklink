import { Link } from "react-router-dom"

export default function HomeNavigation() {
    return (
        <>
            <div className="flex gap-4">
                <Link
                    className="uppercase font-black w-30 h-10 rounded-lg text-center flex items-center justify-center text-brand-1 text-xs cursor-pointer border-transparent border-2 hover:border-brand-1 focus:border-brand-1 active:border-brand-1"
                    to='/auth/login'
                    >Log in</Link>
                
                <Link
                    className="bg-brand-3 border-2 border-brand-3 hover:bg-brand-5 hover:text-brand-1 w-30 uppercase h-10 text-white rounded-lg font-bold flex items-center justify-center text-xs cursor-pointer"
                    to='/auth/register'
                    >Register</Link>
            </div>
        </>
    )
}