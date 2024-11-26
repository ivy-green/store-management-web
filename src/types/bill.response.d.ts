export type IBillResponse = {
    id: string;
    username: string;
    status: number;
    totalPrice: number;
    discountPrice: number;
    billDetailsRequest: IBillDetailsResponse[];
    trackingLogger: BillLogger[];
}

export type BillLogger = {
    action: string;
    timeSpan: string;
    username: string;
    note: string;
}

export type IBillDetailsResponse = {
    productName: string;
    price: number;
    quantity: number;
    totalPrice: number;
}