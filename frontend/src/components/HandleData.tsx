import { SocialNetwork, UserHandle } from "@/types"

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({data} : HandleDataProps) {
    const links : SocialNetwork[] = JSON.parse(data.links).filter((link : SocialNetwork) => link.enabled)

    return (
        <div className="space-y-6">
            <p className="text-4xl text-center font-bold">
                {data.handle}
            </p>

            {data.image && <img className="h-40 w-40 object-cover object-top rounded-full mx-auto" src={data.image} alt="Profile picture"/>}

            <p className="text-lg text-center font-bold">
                {data.description}
            </p>

            <div className="mt-20 flex flex-col gap-6">
                {links.length ? 
                links.map(link => (
                    <a 
                        className="bg-white px-5 py-2 flex gap-4 items-center shadow-md"
                        target="_blank"
                        rel="noreferrer noopener"
                        href="">
                            <img src={`/social/icon_${link.name}.svg`} alt={`${link.name} icon`} className="w-12"/>
                            <p className="font-semibold capitalize">Visit my: {link.name}</p>
                        </a>
                ))
                : <p>This user doesn't have any links</p>}
            </div>
        </div>
/*         <>
            <div>{data.name}</div>
            <div>{data.description}</div>
            <div>/{data.handle}</div>

            {links.map((link : SocialNetwork) => (
                <>
                    <div>{link.name}</div>
                    <div>{link.url}</div>
                </>
            ))}
        </> */
    )
}