import {
    API_AUTH_LOGIN,
    API_AUTH_LOGOUT,
    API_AUTH_REGISTER
} from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { ILoginRequest } from "@/models/requests/authRequests";
import { ILoginResponse } from "@/models/responses/authResponses";
import { IUserRequest } from "@/types/user.request";

const AuthService = {
    login: catchAsync((payload: ILoginRequest)
        : Promise<ServerResponse<ILoginResponse>> => {
        return instance.post(API_AUTH_LOGIN, payload);
    }),
    logout: catchAsync(()
        : Promise<ServerResponse<boolean>> => {
        return instance.post(API_AUTH_LOGOUT);
    }),
    register: catchAsync((payload: IUserRequest)
        : Promise<ServerResponse<boolean>> => {
        return instance.post(API_AUTH_REGISTER, payload);
    }),
}

export default AuthService