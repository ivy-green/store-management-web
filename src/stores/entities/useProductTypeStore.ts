import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IProductTypeStore {
	name: string;
	setName: (val: string | undefined) => void;
	code: number | undefined;
	setCode: (val: number | undefined) => void;
	desc: string;
	setDesc: (val: string | undefined) => void;
}

const useProductTypeStore = create<IProductTypeStore>()(
	persist(
		devtools((set) => ({
			code: undefined,
			setCode: (code: number | undefined) => {
				set({ code });
			},
			name: "",
			setName: (name: string | undefined) => {
				set({ name });
			},
			desc: "",
			setDesc: (desc: string | undefined) => {
				set({ desc });
			},
		})),
		{
			name: "ProductType-store",
		}
	)
);

export default useProductTypeStore;