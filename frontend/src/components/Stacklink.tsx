import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { SocialNetwork, User } from "@/types";
import { useEffect, useState } from "react";
import NavigationTabs from "./NavigationTabs";
import StacklinkLink from "./StacklinkLink";
import Header from "./Header";

type StacklinkProps = {
    data: User
}

export default function Stacklink({data}: StacklinkProps) {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    
    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item : SocialNetwork) => item.enabled))
    }, [data])
    
    const queryClient = useQueryClient()

    const handleDragEnd = (e: DragEndEvent) => {
        const {active, over} = e

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
            const newIndex = enabledLinks.findIndex(link => link.id === over.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
            const links = order.concat(disabledLinks)
            
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }
            })
        }
    }

    return (
        <>
            <Header/>

            <div className="bg-gray-100  min-h-screen">
                <main className="mx-auto max-w-5xl py-10 px-5 ">
                    <NavigationTabs />
                    
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-brand-1 text-2xl"
                            to={`/${data.handle}`}
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

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="mt-5 text-white flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledLinks.map(link => (
                                            <StacklinkLink key={link.name} link={link}/>
                                        ))}
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}