import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserStore {
    fullname: string;
    setFullName: (val: string | undefined) => void;
    username: string;
    setUsername: (val: string | undefined) => void;
    password: string;
    setPassword: (val: string | undefined) => void;
    email: string;
    setEmail: (val: string | undefined) => void;
    phoneNumber: string;
    setPhoneNumber: (val: string | undefined) => void;
    bio: string;
    setBio: (val: string | undefined) => void;
    roleCode: number;
    setRoleCode: (val: number | undefined) => void;
    branchCode: number;
    setBranchCode: (val: number | undefined) => void;
    isAccountBlocked: boolean | undefined;
    setIsAccountBlocked: (val: boolean | undefined) => void;
    reportTo: string;
    setReportTo: (val: string | undefined) => void;
}

const useUserStore = create<IUserStore>()(
    persist(
        devtools((set) => ({
            fullname: "",
            setFullName: (fullname: string | undefined) => {
                set({ fullname });
            },
            username: "",
            setUsername: (username: string | undefined) => {
                set({ username });
            },
            password: "",
            setPassword: (password: string | undefined) => {
                set({ password });
            },
            phoneNumber: "",
            setPhoneNumber: (phoneNumber: string | undefined) => {
                set({ phoneNumber });
            },
            bio: "",
            setBio: (bio: string | undefined) => {
                set({ bio });
            },
            email: "",
            setEmail: (email: string | undefined) => {
                set({ email });
            },
            roleCode: 0,
            setRoleCode: (roleCode: number | undefined) => {
                set({ roleCode });
            },
            branchCode: 0,
            setBranchCode: (branchCode: number | undefined) => {
                set({ branchCode });
            },
            isAccountBlocked: undefined,
            setIsAccountBlocked: (isAccountBlocked: boolean | undefined) => {
                set({ isAccountBlocked });
            },
            reportTo: "",
            setReportTo: (reportTo: string | undefined) => {
                set({ reportTo });
            },
        })),
        {
            name: "User-store",
        }
    )
);

export default useUserStore;