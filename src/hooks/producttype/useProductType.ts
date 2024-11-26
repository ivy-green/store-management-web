import ProductTypeService from "@/services/ProductTypeService";
import useProductTypeStore from "@/stores/entities/useProductTypeStore";
import { IProductTypeResponse } from "@/types/productType.response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConfirmModal from "../modal/useRemoveModal";

export function useProductTypePaged() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [selectList, setSelectList] = useState<DefaultOptionType[]>([]);
    const { setName, setDesc, setCode } = useProductTypeStore();
    const { confirmRemove, RemoveConfirmDialogComponent } = useConfirmModal();

    const { mutate: onCreate, isPending: onCreateAsync } = useCreateProductType(() => {
        resetStates()
    });
    const { mutate: onUpdate, isPending: onUpdateAsync } = useUpdateProductType();
    const { mutate: onRemove, isPending: onRemoveAsync } = useRemoveProductType(confirmRemove);

    const updateOnUseQuery = () => {
        if (data) {
            let list = data.pageData.map(item => ({
                value: item.code,
                label: item.name
            }))

            list.push({
                value: 0,
                label: "All"
            });
            setSelectList(list);
        }
    }

    const { data, isPending: onGetListAsync, status } = useQuery({
        queryKey: ["productType", pageIndex, pageSize],
        queryFn: async () => await ProductTypeService.getList({
            pageIndex: pageIndex,
            pageSize: pageSize
        }).then(async (res) => {
            if (res instanceof Object) {
                let resData = (await res)

                return resData.data
            }
            return res
        }),
        staleTime: Infinity,
        gcTime: 120000, // cacheTime
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const resetStates = () => {
        setName("")
        setDesc("")
    }

    const initStates = (val: IProductTypeResponse) => {
        if (val) {
            setCode(val.code)
            setName(val.name)
            setDesc(val.desc)
        }
    }

    useEffect(() => {
        updateOnUseQuery();
    }, [status])

    return {
        ProductTypeList: data,
        selectList,
        onGetListAsync,
        setPageIndex,
        setPageSize,
        initStates,
        resetStates,
        onCreate,
        onCreateAsync,
        onUpdate,
        onUpdateAsync,
        onRemove,
        onRemoveAsync,
        RemoveConfirmDialogComponent,
    }
}

const useCreateProductType = (onCreateSuccess: () => void) => {
    const { name, desc, setName, setDesc } = useProductTypeStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await ProductTypeService.create({
                name: name,
                desc: desc
            })
        },
        onMutate: () => {
            const toastId = toast.loading('Adding new product type...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["productType"] });
            toast.success("Added successfully!");
            onCreateSuccess()
        },
        onError: (err) => {
            console.log(err);
            // toast.error("Something went wrong");
        }
    })
}

const useUpdateProductType = () => {
    const { name, desc, code } = useProductTypeStore();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await ProductTypeService.update({
            code: code,
            name: name,
            desc: desc
        }),
        onMutate: () => {
            const toastId = toast.loading('Updating product...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["productType"] });
            toast.success("Update successfully!");
        },
        onError: () => {
            // toast.error("Something went wrong");
        }
    })
}

const useRemoveProductType = (confirmRemove: (message: string, action: () => Promise<void>) => Promise<void>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (code: number) => (
            confirmRemove && confirmRemove("Do you want to remove item(s)?", async () => {
                await ProductTypeService.remove(code);
                queryClient.invalidateQueries({ queryKey: ["productType"] });
                toast.success("Remove successfully");
            })),
        onMutate: () => {
            const toastId = toast.loading('Remove product type...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        }
    })
}

