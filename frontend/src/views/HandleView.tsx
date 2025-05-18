import { ClipLoader } from "react-spinners";
import { Navigate, useParams } from "react-router-dom"
import { CSSProperties } from "react";
import { getUserByHandle } from "@/api/StacklinkAPI"
import { useQuery } from "@tanstack/react-query"

export default function HandleView() {
    
    const params = useParams()
    const handle = params.handle!

    const { data, error, isLoading} = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 0
    })

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
    }

    if (isLoading) return <ClipLoader cssOverride={override} size={150} aria-label="Loading Spinner" data-testid="loader" />
    if (error) return <Navigate to={'/404'} />

    return (
        <>
            <div>{ handle }</div>        
        </>
    )
}