import { API_USER_ADD, API_USER_GETLIST, API_USER_PROFILE, API_USER_REMOVE, API_USER_UPDATE } from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { IPagingList, IPagingRequest } from "@/models/requests/pagingRequest";
import { IUser } from "@/types/user";
import { IUserRequest } from "@/types/user.request";
import { IUserResponse } from "@/types/user.response";

const UserService = {
    getList: catchAsync(async (params: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IUserResponse>>> => {
        return await instance.get(API_USER_GETLIST, {
            params: params
        })
    }),
    profile: catchAsync(async ()
        : Promise<ServerResponse<IUser>> => {
        return await instance.get(API_USER_PROFILE)
    }),
    create: catchAsync(async (payload: IUserRequest)
        : Promise<ServerResponse<boolean>> => {
        return await instance.post(API_USER_ADD, payload)
    }),
    update: catchAsync(async (payload: IUserRequest)
        : Promise<ServerResponse<boolean>> => {
        return await instance.put(API_USER_UPDATE, payload)
    }),
    remove: catchAsync(async (username: string)
        : Promise<ServerResponse<boolean>> => {
        return await instance.delete(API_USER_REMOVE, {
            params: {
                username
            }
        })
    }),
}

export default UserService