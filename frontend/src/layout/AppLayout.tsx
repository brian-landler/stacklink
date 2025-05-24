import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/StacklinkAPI";
import Stacklink from "@/components/Stacklink";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2
    })

    if (isLoading) return 'Loading'
    
    if (isError) {
        return <Navigate to={'/auth/login'} />        
    }

    if(data) return <Stacklink data={data} />
}