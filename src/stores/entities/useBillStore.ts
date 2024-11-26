import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IBillStore {
    customerFullname: string | undefined;
    setCustomerFullname: (val: string | undefined) => void;
    customerUsername: string | undefined;
    setCustomerUsername: (val: string | undefined) => void;
    phoneNumber: string;
    setPhoneNumber: (val: string | undefined) => void;
    address: string;
    setAddress: (val: string | undefined) => void;
}

const useBillStore = create<IBillStore>()(
    persist(
        devtools((set) => ({
            customerFullname: undefined,
            setCustomerFullname: (customerFullname: string | undefined) => {
                set({ customerFullname });
            },
            customerUsername: undefined,
            setCustomerUsername: (customerUsername: string | undefined) => {
                set({ customerUsername });
            },
            phoneNumber: "",
            setPhoneNumber: (phoneNumber: string | undefined) => {
                set({ phoneNumber });
            },
            address: "",
            setAddress: (address: string | undefined) => {
                set({ address });
            },
        })),
        {
            name: "bill-store",
        }
    )
);

export default useBillStore;