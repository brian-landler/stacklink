import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { SocialNetwork } from "@/types"

type StacklinkLinkProps = {
    link: SocialNetwork
}

export default function StacklinkLink({link} : StacklinkLinkProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: link.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <>
            <div 
                ref={setNodeRef}
                style={style} 
                className="bg-white py-2 px-5 flex items-center gap-5 rounded-lg hover:bg-slate-200 cursor-grab"
                {...attributes}
                {...listeners}
            >
                <div 
                    className="w-12 h-12 bg-cover"
                    style={{ backgroundImage: `url('/social/icon_${link.name}.svg')`}}
                ></div>

                <p className="text-black capitalize">
                    <span>Follow me on: </span><span className="font-bold">{link.name}</span>
                </p>
            </div>
        </>
    )
}