'use client'

import { API_AUTH_REFRESH_TOKEN, URL_HOME, URL_LOGIN } from "@/assets/contraints";
import httpMessage from "@/assets/httpMessage";
import { useAuthStore } from "@/stores";
//import AuthService from "@/services/AuthService";
import { getRefreshtokenFromLS, getTokenFromLS, setRefreshTokenToLS, setTokenToLS } from "@/utils/auth";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import instance from "./axiosConfig";

const catchAsync = <T extends AsyncFunction<any>>(
    asyncFunction: T
): CatchAsyncReturn<T> => {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            const result = await asyncFunction(...args);
            return result;
        } catch (error) {
            let toastMessage = "Something went wrong";
            if (error instanceof AxiosError) {
                const errorResponse = error.response?.data as ServerErrorResponse;
                const errorRequest = error.response?.request?.responseURL;

                if (error.code === "ERR_NETWORK") {
                    toastMessage = "Cannot connect to server";
                } else if (error.response) {
                    const { status, config } = error.response;
                    const errorCode = error.response?.data?.code;
                    const message = error.response?.data?.description;

                    toastMessage = message;

                    if (status === 401 && !errorRequest.includes("refreshToken")) {
                        // attemp to call refreshToken
                        let currAccessToken = getTokenFromLS()
                        let currRefreshToken = getRefreshtokenFromLS()
                        if (currAccessToken && currRefreshToken && currAccessToken !== 'undefined' && currRefreshToken !== 'undefined')

                            await axios.post(API_AUTH_REFRESH_TOKEN,
                                {
                                    accessToken: getTokenFromLS() || "",
                                    refreshToken: getRefreshtokenFromLS() || "",
                                    branchCode: 0,
                                    branchName: ""
                                }
                            ).then(async (_item) => {
                                if (_item) {
                                    const { accessToken, refreshToken } = (await _item).data;
                                    useAuthStore.setState({ token: accessToken });
                                    setTokenToLS(accessToken);
                                    setRefreshTokenToLS(refreshToken);
                                    // window.location.href = window.location.pathname;
                                    if (config && config.headers) {
                                        config.headers["Authorization"] = `Bearer ${accessToken}`;
                                        return await instance.request(config);
                                    }
                                }
                            }).catch(() => {
                                if (errorCode === "USER_BLOCKED") {
                                    toast.error("Your account has been blocked");
                                } else {
                                    window.location.href = "/auth";
                                }
                            });

                        window.location.href = URL_LOGIN;
                        return Promise.reject(error);
                    } else if (status === 403 && error.config?.method === "get") {
                        toastMessage = "You are not allowed to perform this action";
                        toast.error(toastMessage)
                        window.location.href = URL_HOME;
                        return Promise.reject(error);
                    } else if (status === 404 && error.config?.method === "get") {
                        return Promise.reject(error);
                    } else if (status === 400) {
                        console.error(error.response);
                        const message = errorResponse.code;
                        if (message in httpMessage) {
                            toastMessage = httpMessage[message];
                        }
                    }
                }

                errorRequest && !errorRequest.includes("refreshToken") && toast.error(toastMessage);
            }
            return Promise.reject(error);
        }
    };
};

export default catchAsync;
