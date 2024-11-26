import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IProductStore {
	code: number;
	setCode: (val: number | undefined) => void;
	name: string;
	setName: (val: string | undefined) => void;
	desc: string;
	setDesc: (val: string | undefined) => void;
	productType: number;
	setProductType: (val: number | undefined) => void;
	price: number;
	setPrice: (val: number | undefined) => void;
	quantity: number;
	setQuantity: (val: number | undefined) => void;
}

const useProductStore = create<IProductStore>()(
	persist(
		devtools((set) => ({
			code: 0,
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
			productType: 1,
			setProductType: (productType: number | undefined) => {
				set({ productType });
			},
			price: 0,
			setPrice: (price: number | undefined) => {
				set({ price });
			},
			quantity: 0,
			setQuantity: (quantity: number | undefined) => {
				set({ quantity });
			},
		})),
		{
			name: "product-store",
		}
	)
);

export default useProductStore;