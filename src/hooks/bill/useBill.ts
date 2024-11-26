"use client";

import { IProductResponse } from "@/models/responses/productResponses";
import BillService from "@/services/BillService";
import { useAuthStore } from "@/stores";
import useBillStore from "@/stores/entities/useBillStore";
import { IBillDetailsRequest, IBillRequest, IBillUpdateRequest } from "@/types/bill.request";
import { getHighestRole } from "@/utils/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useBillPaged() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(9);
    const { user, token } = useAuthStore();
    const queryClient = useQueryClient();

    const [productSelectList, setProductSelectList] = useState<IProductResponse[]>([]);
    const [billStatusSelected, setBillStatusSelected] = useState<number[]>([]);

    const { setCustomerFullname, setPhoneNumber, setAddress, setCustomerUsername
    } = useBillStore();

    const resetStates = () => {
        setCustomerFullname("")
        setPhoneNumber("")
        setAddress("")
        setCustomerUsername("")
    }

    const {
        mutate: onCreate,
        isPending: onCreateAsync, status
    } = useCreateBill(user?.username ?? "", resetStates);
    const { mutate: onUpdate, isPending: onUpdateAsync } = useUpdateBill(user?.username ?? "");

    const { data, isPending: onGetListAsync } = useQuery({
        queryKey: ["bill", pageIndex, pageSize],
        queryFn: async () => await BillService.getList({
            pageIndex: pageIndex,
            pageSize: pageSize,
            statuses: JSON.stringify({
                status: billStatusSelected
            })
        }).then(async (res) => {
            if (res instanceof Object) {
                let resData = (await res)
                return resData.data
            }
            return res
        }),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const isInclude = (list: IProductResponse[], val: IProductResponse) => {
        return list.includes(val)
    }

    const toggleProductList = (val: IProductResponse) => {
        setProductSelectList((prevList) => {
            if (prevList.some(product => product.name === val.name)) {
                return prevList.filter(product => product.name !== val.name);
            } else {
                return [...prevList, val];
            }
        });
    }

    useEffect(() => {
        status == "success" && resetProductSelectList();
    }, [status])

    const resetProductSelectList = () => {
        setProductSelectList([]);
    }

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["bill"] });
    }, [billStatusSelected])

    return {
        BillList: data, onGetListAsync,
        productSelectList,
        setPageIndex, setPageSize,
        onCreate: onCreate, onCreateAsync,
        onUpdate: onUpdate, onUpdateAsync,
        setBillStatusSelected, billStatusSelected,
        toggleProductList,
        isInclude,
        resetProductSelectList,
        resetStates,
    }
}

export const useCreateBill = (username: string, onSucessCreate: () => void) => {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const {
        customerFullname, phoneNumber, address, customerUsername,
    } = useBillStore();

    return useMutation({
        mutationFn: async (productList: IProductResponse[]) => {
            if (username == "") {
                toast.error("Please login again");
                return Promise.reject();
            }

            if (typeof customerFullname === "undefined" || customerFullname == ""
                || phoneNumber == ""
                || address == "") {
                toast.error("Please filled all information for us to shipping products");
                return Promise.reject();
            }

            if (productList.length == 0) {
                toast.error("Please choose at least one product");
                return Promise.reject();
            }

            const totalPrice = productList.reduce((sum, item) => sum + item.price, 0)
            var billDetailsRequest: IBillDetailsRequest[] = productList.map((item) =>
            ({
                productName: item.name,
                quantity: 1,
                price: item.price * 1,
            }))

            let getCustomerUsername = getHighestRole() == "Customer"
                ? user?.username
                : customerUsername;

            var billRequest: IBillRequest = {
                username: username,
                totalPrice: totalPrice,
                discountPrice: 0,
                billDetailsRequest: billDetailsRequest,
                customerFullname: customerFullname ?? "",
                customerUsername: getCustomerUsername,
                address: address,
                phoneNumber: phoneNumber
            };

            await BillService.create(billRequest);
        },
        onMutate: () => {
            const toastId = toast.loading('Creating bill...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["bill"] });
            toast.success("Created successfully!");
            onSucessCreate();
        }
    })
}

export const useUpdateBill = (user: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IBillUpdateRequest) => {
            if (user == "") {
                toast.error("Please login again");
                return Promise.reject();
            }

            await BillService.update(payload);
        },
        onMutate: () => {
            const toastId = toast.loading('Updating bill...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["bill"] });
            toast.success("Updated successfully!");
        }
    })
}