export type IProductRequest = {
    code?: number;
    name: string;
    desc: string;
    quantity: number;
    price: number;
    productTypeCode: number;
    creatorUsername: string;
}