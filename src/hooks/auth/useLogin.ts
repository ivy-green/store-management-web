import toast from "react-hot-toast";

import { URL_ADMIN, URL_HOME } from "@/assets/contraints";
import { ILoginRequest } from "@/models/requests/authRequests";
import { ILoginResponse } from "@/models/responses/authResponses";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { useAuthStore } from "@/stores";
import { getHighestRole, setRefreshTokenToLS, setTokenToLS } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies';
import { useState } from "react";

export const useLogin = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const handleLogin = async (payload: ILoginRequest) => {
        setLoading(true);
        await AuthService.login(payload)
            .then(async (response: void | Promise<ServerResponse<ILoginResponse>>): Promise<void> => {
                if (response) {
                    const { accessToken, roles, refreshToken, branchCode, branchName } = (await response).data;
                    useAuthStore.setState({ token: accessToken });
                    setTokenToLS(accessToken);
                    setRefreshTokenToLS(refreshToken);

                    const userProfile = await UserService.profile();
                    if (userProfile) {
                        useAuthStore.setState({
                            user: {
                                ...userProfile.data,
                                roles,
                            },
                            branchCode,
                            branchName,
                        });
                    }

                    roles && setCookie(null, 'roles', roles?.toString(), {
                        maxAge: 24 * 60 * 60, // 1 days
                        path: '/',
                    });

                    toast.success("Login successfully");
                    if (getHighestRole() == "Admin") {
                        router.push(URL_ADMIN)
                    } else {
                        router.push(URL_HOME)
                    }
                    setLoading(false);
                }
            }).catch((_err) => {
                // toast.error("Please try again");
                setLoading(false);
            });
    }

    return { handleLogin, loading }
}

