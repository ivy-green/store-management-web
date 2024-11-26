import { IUserResponse } from "@/types/user.response";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuthStore {
    token: string;
    setToken: (val: string | undefined) => void;
    username: string;
    setUsername: (val: string | undefined) => void;
    branchCode: number | undefined;
    setBranchCode: (val: number | undefined) => void;
    branchName: string;
    setBranchName: (val: string | undefined) => void;
    user: IUserResponse | null;
    setUser: (val: IUserResponse | undefined) => void;
}

const useAuthStore = create<IAuthStore>()(
    persist(
        devtools((set) => ({
            token: "",
            setToken: (token: string | undefined) => {
                set({ token });
            },
            username: "",
            setUsername: (token: string | undefined) => {
                set({ token });
            },
            branchCode: undefined,
            setBranchCode: (branchCode: number | undefined) => {
                set({ branchCode });
            },
            branchName: "",
            setBranchName: (branchName: string | undefined) => {
                set({ branchName });
            },
            user: null,
            setUser: (user: IUserResponse | undefined) => {
                set({ user });
            },
        })),
        {
            name: "Auth-store",
        }
    )
);

export default useAuthStore;