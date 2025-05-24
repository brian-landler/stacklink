import { useQueryClient } from "@tanstack/react-query";
import { PrimaryButton } from "../buttons";

export default function AdminNavigation() {
    const queryClient = useQueryClient()
    
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})
    }

    return (
        <PrimaryButton onClick={logout}>Log out</PrimaryButton>
    )
}