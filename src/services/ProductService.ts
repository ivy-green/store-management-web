import {
    API_PRODUCT_ADD,
    API_PRODUCT_CUSTOMER_GETLIST,
    API_PRODUCT_GETLIST,
    API_PRODUCT_REMOVE,
    API_PRODUCT_UPDATE,
    API_PRODUCT_UPDATE_ON_SALE
} from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { IPagingList, IPagingRequest } from "@/models/requests/pagingRequest";
import { IProductResponse } from "@/models/responses/productResponses";
import { IProductRequest } from "@/types/product.request";

const ProductService = {
    searchList: catchAsync((query: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IProductResponse>>> => {
        return instance.get(API_PRODUCT_GETLIST, {
            params: query
        });
    }),
    getProductCustomerList: catchAsync((query: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IProductResponse>>> => {
        return instance.get(API_PRODUCT_CUSTOMER_GETLIST, {
            params: query
        });
    }),
    create: catchAsync((payload: IProductRequest)
        : Promise<ServerResponse<boolean>> => {
        return instance.post(API_PRODUCT_ADD, payload);
    }),
    remove: catchAsync((id: number)
        : Promise<ServerResponse<boolean>> => {
        return instance.delete(API_PRODUCT_REMOVE + `/${id}`);
    }),
    update: catchAsync((payload: IProductRequest)
        : Promise<ServerResponse<boolean>> => {
        return instance.put(API_PRODUCT_UPDATE, payload);
    }),
    updateOnSale: catchAsync((productCode: number)
        : Promise<ServerResponse<boolean>> => {
        return instance.put(API_PRODUCT_UPDATE_ON_SALE, null, {
            params: {
                productCode
            }
        });
    }),
}

export default ProductService