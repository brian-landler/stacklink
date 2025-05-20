import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen bg-brand-6">
                <div className="max-h-50 p-x-5 pt-10">
                    <Logo className="w-80 object-contain mx-auto object-center" />
                </div>

                <div className="max-w-lg mx-auto block mt-10">
                    <Outlet/>
                </div>
            </div>

            <Toaster/>
        </>
    )
}