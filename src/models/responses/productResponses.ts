import { IProductTypeResponse } from "@/types/productType.response";

export interface IProductResponse {
    id?: string;
    code?: number;
    name: string;
    desc: string;
    price: number;
    quantity: number;
    status?: string;
    createAt?: string;
    creatorUsername?: string;
    isOnSale?: boolean;
    type?: IProductTypeResponse;
}