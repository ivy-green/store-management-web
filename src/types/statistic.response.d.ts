export type IStatisticBillResponse = {
    revenue: number;
    date: string;
    billQuantity: number;
    productQuantity: number;
}

export type IStatisticGeneralResponse = {
    revenue: number;
    bills: number;
    products: number;
}