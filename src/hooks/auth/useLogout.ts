import { URL_LOGIN } from "@/assets/contraints";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores";
import { clearLocalStorage } from "@/utils/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {
    const router = useRouter()
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await AuthService.logout().then(async (response: void | Promise<ServerResponse<boolean>>): Promise<void> => {
            if (response) {
                clearLocalStorage();
                queryClient.clear(); // clear cache
                useAuthStore.setState({ token: undefined });
                useAuthStore.setState({
                    user: undefined,
                });
            }
            router.push(URL_LOGIN)
        });
    }

    return { handleLogout }
}

export default useLogout