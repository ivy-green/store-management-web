import { API_BILL_ADD, API_BILL_GETLIST, API_BILL_UPDATE } from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { IPagingList, IPagingRequest } from "@/models/requests/pagingRequest";
import { IBillRequest, IBillUpdateRequest } from "@/types/bill.request";
import { IBillResponse } from "@/types/bill.response";

const BillService = {
    getList: catchAsync((query: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IBillResponse>>> => {
        return instance.get(API_BILL_GETLIST, {
            params: query
        });
    }),
    create: catchAsync((payload: IBillRequest)
        : Promise<ServerResponse<IPagingList<IBillResponse>>> => {
        return instance.post(API_BILL_ADD, payload);
    }),
    update: catchAsync((payload: IBillUpdateRequest)
        : Promise<ServerResponse<IPagingList<IBillResponse>>> => {
        return instance.put(API_BILL_UPDATE, null, {
            params: payload
        });
    }),
}

export default BillService