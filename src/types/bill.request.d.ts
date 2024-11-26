export type IBillRequest = {
    username?: string;
    totalPrice: number;
    discountPrice: number;

    customerUsername?: string;
    customerFullname: string;
    address: string;
    phoneNumber: string;

    billDetailsRequest: IBillDetailsRequest[];
}

export type IBillDetailsRequest = {
    productName: string;
    quantity: number;
    price: number;
}

export type IBillUpdateRequest = {
    billId: string;
    status: number;
}