import { useEffect, useState } from "react"
import { toast } from "sonner"
import { social } from "@/data/social"
import StacklinkInput from "@/components/StacklinkInput"
import { isValidUrl } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/StacklinkAPI"
import { PrimaryButtonForm } from "@/components/buttons"
import { SocialNetwork, User } from "@/types"

export default function StacklinkView() {
    const [stacklinkLinks, setStacklinkLinks] = useState(social)

    const queryClient = useQueryClient()
    const user : User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)            
        },
        onSuccess: () => {
            toast.success('Updated correctly')
        }
    })

    useEffect(() => {
        const updatedData = stacklinkLinks.map( item => {
            const userLink = JSON.parse(user.links).find((link : SocialNetwork) => link.name === item.name)
            if (userLink) {
                return {...item, url: userLink.url, enabled: userLink.enabled}                
            }
            return item
        })

        setStacklinkLinks(updatedData)
    }, [])

    const handleUrlChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = stacklinkLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} :link )
        setStacklinkLinks(updatedLinks)
    }

    const links : SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork : string) => {
        const updatedLinks = stacklinkLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return {...link, enabled: !link.enabled}
                } else {
                    toast.error('Invalid URL')
                }
                
            }
            return link
        })
        setStacklinkLinks(updatedLinks)

        // Re-ordering social media by ID, updating IDs when disabled
        let updatedItems: SocialNetwork[] = []
        const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
        if (selectedSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length + 1
            if (links.some(link => link.name === socialNetwork)) {
                updatedItems = links.map(link => {
                    if ( link.name === socialNetwork ) {
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    } else {
                        return link
                    }
                })
            } else {
                const newItem = {
                    ...selectedSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }
        } else {
            const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updatedItems = links.map(link => {
                if(link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if(link.id > indexToUpdate) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link
                }
            })
        }

        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        })
    }

    return (
        <>
            <div className="space-y-5">
                {stacklinkLinks.map( item => (
                    <StacklinkInput 
                        key={item.name}
                        item={item}
                        handleUrlChange={handleUrlChange}
                        handleEnableLink={handleEnableLink}
                    />
                )) }

                <PrimaryButtonForm
                    onClick={() => mutate(user)}
                >Save changes
                </PrimaryButtonForm>
            </div>
        </>
    )
}