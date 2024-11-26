'use client'

import { API_URL_BASE, API_URL_BASE_DEV, URL_LOGIN } from "@/assets/contraints";
import useAuthStore from "@/stores/entities/useAuthStore";
import { clearLocalStorage, getTokenFromLS } from "@/utils/auth";
import axios from "axios";

// change this
const BASE_URL_DEV = API_URL_BASE_DEV;

const isProd = process.env.PROD;
const BASE_URL = isProd ? API_URL_BASE : BASE_URL_DEV;
const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

instance.interceptors.request.use(async (req) => {
    const token = useAuthStore.getState().token;

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    if (!getTokenFromLS() && req.method == "post" && !req.url?.includes("login") && !req.url?.includes("register")) {
        clearLocalStorage();
        window.location.href = URL_LOGIN;
    }

    return req;
});


export default instance;
