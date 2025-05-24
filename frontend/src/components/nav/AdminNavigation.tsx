import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../buttons";

export default function AdminNavigation() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.removeQueries({queryKey: ['user']})
        navigate('/auth/login')
    }

    return (
        <PrimaryButton onClick={logout}>Log out</PrimaryButton>
    )
}