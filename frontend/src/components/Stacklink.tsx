import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "./NavigationTabs";
import { PrimaryButton } from "./buttons";
import { User } from "@/types";

type StacklinkProps = {
    data: User
}

export default function Stacklink({data}: StacklinkProps) {
    return (
        <>
            <header className="bg-brand-6 py-5 px-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full lg:p-0 py-4 md:w-1/3">
                        <img src="/logo.png" className="w-40 block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <PrimaryButton>Log out</PrimaryButton>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100  min-h-screen">
                <main className="mx-auto max-w-5xl py-10 px-5 ">
                    <NavigationTabs />
                    
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-brand-1 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visit my profile at /{data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-brand-1 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">
                                {data.handle}
                            </p>

                            {data.image &&
                                <img src={data.image} alt="Profile picture" className="mx-auto max-w-[200px] max-h-[200px]"/>
                            }

                            <p className="text-center text-lg text-white font-bold">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}