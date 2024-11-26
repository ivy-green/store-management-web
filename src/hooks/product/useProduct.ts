'use client'

import { IProductResponse } from "@/models/responses/productResponses"
import ProductService from "@/services/ProductService"
import { useAuthStore, useProductStore } from "@/stores"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConfirmModal from "../modal/useRemoveModal"

export function useProductPaged() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { setName, setDesc, setPrice, setQuantity, setProductType, setCode
    } = useProductStore();
    const { confirmRemove, RemoveConfirmDialogComponent } = useConfirmModal();
    const [searchValue, setSearchValue] = useState("");
    const [categoryCode, setCategoryCode] = useState(0);
    const queryClient = useQueryClient();

    const { mutate: onCreate, isPending: onCreateAsync } = useCreateProduct();
    const { mutate: onUpdate, isPending: onUpdateAsync } = useUpdateProduct();
    const { mutate: onRemove, isPending: onRemoveAsync } = useRemoveProduct(confirmRemove);

    const { data, isPending: onGetListAsync } = useQuery({
        queryKey: ["product", pageIndex, pageSize],
        queryFn: async () => await ProductService.searchList({
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchString: searchValue,
            categoryCode: categoryCode
        }).then(async (res) => {
            if (res instanceof Object) {
                return (await res).data
            }
            return res
        }),
        staleTime: 120000,
        gcTime: 120000, // cacheTime
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const initStates = (item: IProductResponse | undefined) => {
        if (item) {
            setCode(item.code)
            setName(item.name)
            setDesc(item.desc)
            setPrice(item.price)
            setQuantity(item.quantity)
            setProductType(item.type?.code)
        }
    }

    const resetStates = () => {
        setName("")
        setDesc("")
        setPrice(0)
        setQuantity(0)
    }

    const reloadData = () => {
        const toastId = toast.loading('Loading...');
        setTimeout(() => {
            toast.dismiss(toastId);
            toast.success('Completed!');
        }, 1000);

        queryClient.invalidateQueries({ queryKey: ["product"] });
        setSearchValue("");
    }

    const onSearch = () => {
        queryClient.invalidateQueries({ queryKey: ["product"] });
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);

    useEffect(() => {
        setPageIndex(0)
        queryClient.invalidateQueries({ queryKey: ["product"] });
    }, [categoryCode])

    return {
        productList: (data !== null && typeof data === 'object') ? data : null,
        setPageIndex, setPageSize, pageIndex, pageSize,
        initStates,
        resetStates,
        onGetListAsync,
        onCreate,
        onCreateAsync,
        onUpdate,
        onUpdateAsync,
        onRemove,
        onRemoveAsync,
        reloadData,
        setCategoryCode, categoryCode,
        onSearch, searchValue, setSearchValue,
        RemoveConfirmDialogComponent,
    }
}

export const useCreateProduct = () => {
    const { name, desc, price, quantity, productType,
        setName, setDesc, setPrice, setQuantity, setProductType
    } = useProductStore();
    const queryClient = useQueryClient();
    const { branchCode: userBranchCode } = useAuthStore();

    const resetStates = () => {
        setName("")
        setDesc("")
        setPrice(0)
        setQuantity(0)
        setProductType(0)
    }

    interface createProp {
        user: string,
        onSuccess: () => void
    }

    return useMutation({
        mutationFn: async (props: createProp) => {
            if (name == "" || price < 1000 || productType == 0) {
                toast.error(`Please fill required fields: 
                    ${name == "" ?? 'name'} 
                    ${price < 1000 ?? 'price'} 
                    ${productType == 0 ?? 'product type'}`);
                return Promise.reject();
            }

            await ProductService.create({
                name,
                desc,
                quantity,
                price,
                productTypeCode: productType,
                creatorUsername: props.user,
            })
            props.onSuccess();
        },
        onMutate: () => {
            const toastId = toast.loading('Creating product...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
            toast.success("Create successfully!");
            resetStates();
        },
        onError: (err) => {
            console.log(err);
        }
    })
}

export const useUpdateProduct = () => {
    const { name, desc, price, quantity, productType, code
    } = useProductStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user: string) => {
            return await ProductService.update({
                code: code,
                name: name,
                desc: desc,
                quantity: quantity,
                price: price,
                productTypeCode: productType,
                creatorUsername: user,
            })
        },
        onMutate: () => {
            const toastId = toast.loading('Updating product...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
            toast.success("Update successfully!");
        },
    })
}

export const useRemoveProduct = (
    confirmRemove: (message: string, action: () => Promise<void>) => Promise<void>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (code: number) => (
            await confirmRemove("Do you want to remove item(s)?", async () => {
                await ProductService.remove(code);
                queryClient.invalidateQueries({ queryKey: ["product"] });
                toast.success("Remove successfully");
            })),
    })
}

export const useProductCustomerList = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { data, isPending } = useQuery({
        queryKey: ["customerProduct", pageIndex, pageSize],
        queryFn: async () => await ProductService.getProductCustomerList({
            pageIndex: pageIndex,
            pageSize: pageSize
        }).then(async (res) => {
            if (res instanceof Object) {
                return (await res).data
            }
            return res
        }),
        staleTime: 120000,
        gcTime: 120000, // cacheTime
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        data,
        onGetCustomerProductListAsync: isPending,
        pageIndex, pageSize, setPageIndex, setPageSize
    }
}

export const useUpdateProductOnSale = (confirmModal: (message: string, action: () => Promise<void>) => Promise<void>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productCode?: number) => {
            if (typeof productCode == "undefined") {
                toast.error("Product's Id get empty")
                return Promise.reject;
            }

            return await confirmModal("Do you want to update this field?", async () => {
                await ProductService.updateOnSale(productCode);
                queryClient.invalidateQueries({ queryKey: ["product"] });
                toast.success("Update successfully!");
            })
        },
        onMutate: () => {
            const toastId = toast.loading('Updating product state...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
    })
}
