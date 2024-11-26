import UserService from "@/services/UserService";
import useUserStore from "@/stores/entities/useUserStore";
import { IUserResponse } from "@/types/user.response";
import { getHighestRole } from "@/utils/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConfirmModal from "../modal/useRemoveModal";

export function useUserPaged() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [rolesFilter, setRolesFilter] = useState<number[]>([]);
    const [managerSelectList, setManagerSelectList] = useState<DefaultOptionType[]>([]);

    const { confirmRemove, RemoveConfirmDialogComponent } = useConfirmModal();
    const [branchFilterCode, setBranchFilderCode] = useState(-1);

    const { mutate: onCreate, isPending: onCreateAsync } = useCreateUser();
    const { mutate: onUpdate, isPending: onUpdateAsync } = useUpdateUser();
    const { mutate: onRemove, isPending: onRemoveAsync } = useRemoveUser(confirmRemove);
    const queryClient = useQueryClient();

    const {
        setFullName, setUsername, setRoleCode, setIsAccountBlocked,
        setBranchCode, setPhoneNumber, setEmail, setBio
    } = useUserStore();

    const { data, isPending: onGetListAsync } = useQuery({
        queryKey: ["user", pageIndex, pageSize],
        queryFn: async () => await UserService.getList({
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchString: searchValue,
            branchCode: branchFilterCode,
            roles: rolesFilter.join(",")
        }).then(async (res) => {
            if (res instanceof Object) {
                return (await res).data
            }
            return res
        }),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const initStates = (val: IUserResponse) => {
        if (val) {
            setFullName(val.fullname)
            setUsername(val.username)
            setEmail(val.email)
            setBio(val.bio)
            setIsAccountBlocked(val.isAccountBlocked)
            setPhoneNumber(val.phoneNumber)
            setRoleCode(val.roles?.findLast(_x => true))
            setBranchCode(val.branchData?.code)
        }
    }

    const reloadData = () => {
        const toastId = toast.loading('Loading...');
        setTimeout(() => {
            toast.dismiss(toastId);
            toast.success('Completed!');
        }, 1000);

        queryClient.invalidateQueries({ queryKey: ["user"] });
        setSearchValue("");
    }

    const updateOnUseQuery = () => {
        if (data) {
            let list = data.pageData.filter(item => item.roles?.includes("Manager")) // fix this
                .map(item => ({
                    value: item.username,
                    label: item.username
                }))

            setManagerSelectList(list);
        }
    }

    const getManagerData = () => {
        setRolesFilter(list => [...list, 2]);
        queryClient.invalidateQueries({ queryKey: ["user"] });

    }

    useEffect(() => {
        updateOnUseQuery()
    }, [onGetListAsync])

    const onSearch = () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue, branchFilterCode]);

    return {
        UserList: data, onGetListAsync,
        setPageIndex, setPageSize,
        onCreate, onCreateAsync,
        onRemove, onRemoveAsync,
        RemoveConfirmDialogComponent,
        onUpdate, onUpdateAsync,
        searchValue, setSearchValue,
        onSearch,
        reloadData,
        setBranchFilderCode,
        initStates,
        managerSelectList,
    }
}

export const useCreateUser = () => {
    const { username, password, phoneNumber, fullname, roleCode, email, bio, branchCode, reportTo,
        setFullName, setUsername, setPassword, setRoleCode, setBranchCode, setPhoneNumber
    } = useUserStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await UserService.create({
                fullname: fullname,
                username: username,
                phoneNumber: phoneNumber,
                password: password,
                roleCode: roleCode,
                branchCode,
                email: email,
                bio: bio,
                ReportToPersonUsername: reportTo
            })
        },
        onMutate: () => {
            const toastId = toast.loading('Creating User...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            setFullName("")
            setUsername("")
            setPassword("")
            setPhoneNumber("")
            setRoleCode(1)
            setBranchCode(-1)
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Create successfully!");
        }
    })
}

export const useUpdateUser = () => {
    const { username, password, fullname, phoneNumber, isAccountBlocked,
        email, bio, branchCode } = useUserStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await UserService.update({
            fullname: fullname,
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            setAccountBlocked: isAccountBlocked,
            roleCode: getHighestRole() == "Admin" ? 1 : 0,
            branchCode,
            email: email,
            bio: bio
        }),
        onMutate: () => {
            const toastId = toast.loading('Updating User Profile...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Update successfully!");
        }
    })
}

const useRemoveUser = (
    confirmRemove: (message: string,
        action: () => Promise<void>) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (username: string) => (
            await new Promise<void>((resolve, reject) => {
                confirmRemove && confirmRemove("Do you want to remove item(s)?", async () => {
                    try {
                        await UserService.remove(username);
                        queryClient.invalidateQueries({ queryKey: ["user"] });
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
            })),
        onSuccess: (_res) => {
            toast.success(`Remove user successfully`);
        },
        onError: (error) => {
            console.log(error);
        }
    })
}
