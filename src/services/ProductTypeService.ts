import { API_PRODUCT_TYPE_ADD, API_PRODUCT_TYPE_GETLIST, API_PRODUCT_TYPE_REMOVE, API_PRODUCT_TYPE_UPDATE } from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { IPagingList, IPagingRequest } from "@/models/requests/pagingRequest";
import { IProductTypeRequest } from "@/types/productType.request";
import { IProductTypeResponse } from "@/types/productType.response";

const ProductTypeService = {
    getList: catchAsync((query: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IProductTypeResponse>>> => {
        return instance.get(API_PRODUCT_TYPE_GETLIST, {
            params: query
        });
    }),
    create: catchAsync((payload: IProductTypeRequest)
        : Promise<ServerResponse<IPagingList<IProductTypeResponse>>> => {
        return instance.post(API_PRODUCT_TYPE_ADD, payload);
    }),
    update: catchAsync((payload: IProductTypeRequest)
        : Promise<ServerResponse<IPagingList<IProductTypeResponse>>> => {
        return instance.put(API_PRODUCT_TYPE_UPDATE, payload);
    }),
    remove: catchAsync((id: number)
        : Promise<ServerResponse<IPagingList<IProductTypeResponse>>> => {
        return instance.delete(API_PRODUCT_TYPE_REMOVE + `/${id}`);
    }),
}

export default ProductTypeService