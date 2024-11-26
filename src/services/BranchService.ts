import { API_BRANCH_ADD, API_BRANCH_GETLIST, API_BRANCH_REMOVE, API_BRANCH_UPDATE } from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { IPagingList, IPagingRequest } from "@/models/requests/pagingRequest";
import { IBranchRequest } from "@/types/branch.request";
import { IBranchResponse } from "@/types/branch.response";

const BranchService = {
    getList: catchAsync((query: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IBranchResponse>>> => {
        return instance.get(API_BRANCH_GETLIST, {
            params: query
        });
    }),
    create: catchAsync((payload: IBranchRequest)
        : Promise<ServerResponse<IPagingList<IBranchResponse>>> => {
        return instance.post(API_BRANCH_ADD, payload);
    }),
    update: catchAsync((payload: IBranchRequest)
        : Promise<ServerResponse<IPagingList<IBranchResponse>>> => {
        return instance.put(API_BRANCH_UPDATE, payload);
    }),
    remove: catchAsync((id: number)
        : Promise<ServerResponse<IPagingList<IBranchResponse>>> => {
        return instance.delete(API_BRANCH_REMOVE + `/${id}`);
    }),
}

export default BranchService