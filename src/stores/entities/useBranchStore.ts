import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IBranchStore {
	code: number | undefined;
	setCode: (val: number | undefined) => void;
	name: string;
	setName: (val: string | undefined) => void;
}

const useBranchStore = create<IBranchStore>()(
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
		})),
		{
			name: "branch-store",
		}
	)
);

export default useBranchStore;