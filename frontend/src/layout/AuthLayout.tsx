import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen bg-brand-2">
                <div className="max-h-50 p-x-5 pt-10">
                    <img className="w-80 object-contain mx-auto object-center" src="/logo.png" alt="Stacklink logo" />
                </div>

                <div className="max-w-lg mx-auto block mt-10">
                    <Outlet/>
                </div>
            </div>

            <Toaster/>
        </>
    )
}