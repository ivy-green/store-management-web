import BranchService from "@/services/BranchService";
import useBranchStore from "@/stores/entities/useBranchStore";
import { IBranchResponse } from "@/types/branch.response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConfirmModal from "../modal/useRemoveModal";

export function useBranchPaged() {
    const [pageIndex, setPageIndex] = useState(0);
    const [selectList, setSelectList] = useState<DefaultOptionType[]>([]);
    const [pageSize, setPageSize] = useState(10);
    const { setName, setCode } = useBranchStore();
    const { confirmRemove, RemoveConfirmDialogComponent } = useConfirmModal();

    const { mutate: onCreate, isPending: onCreateAsync } = useCreateBranch();
    const { mutate: onUpdate, isPending: onUpdateAsync } = useUpdateBranch();
    const { mutate: onRemove, isPending: onRemoveAsync } = useRemoveBranch(confirmRemove);

    const updateOnUseQuery = () => {
        if (data) {
            let list = data.pageData.map(item => ({
                value: item.code,
                label: item.name
            }))

            list.push({
                value: -1,
                label: "All"
            })

            setSelectList(list);
        }
    }

    const { data, isPending: onGetListAsync, status } = useQuery({
        queryKey: ["branch", pageIndex, pageSize],
        queryFn: async () => await BranchService.getList({
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
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const resetStates = () => {
        setName("")
    }

    const initStates = (val: IBranchResponse) => {
        if (val) {
            setCode(val.code)
            setName(val.name)
        }
    }

    useEffect(() => {
        updateOnUseQuery();
    }, [status])

    return {
        BranchList: data,
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


const useCreateBranch = () => {
    const { name, setName } = useBranchStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await BranchService.create({
                name: name,
            })
        },
        onMutate: () => {
            const toastId = toast.loading('Adding new branch...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["branch"] });
            toast.success("Added successfully!");
            setName("")
        },
        onError: (err) => {
            console.log(err);
            // toast.error("Something went wrong");
        }
    })
}

const useUpdateBranch = () => {
    const { name, code } = useBranchStore();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await BranchService.update({
            code: code,
            name: name,
        }),
        onMutate: () => {
            const toastId = toast.loading('Updating product...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["branch"] });
            toast.success("Update successfully!");
        }
    })
}

const useRemoveBranch = (confirmRemove: (message: string, action: () => Promise<void>) => Promise<void>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (code: number) => (
            confirmRemove && confirmRemove("Do you want to remove item(s)?", async () => {
                await BranchService.remove(code);
                queryClient.invalidateQueries({ queryKey: ["branch"] });
            })),
        onMutate: () => {
            const toastId = toast.loading('Remove product type...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
    })
}

