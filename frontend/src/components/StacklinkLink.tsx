import { SocialNetwork } from "@/types"

type StacklinkLinkProps = {
    link: SocialNetwork
}

export default function StacklinkLink({link} : StacklinkLinkProps) {
    return (
        <>
            <div className="bg-white py-2 px-5 flex items-center gap-5 rounded-lg">
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