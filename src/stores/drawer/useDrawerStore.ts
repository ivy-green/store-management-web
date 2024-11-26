import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IDrawerStore {
	openDrawer: boolean;
	setOpenDrawer: (openDrawer: boolean | undefined) => void;
}

const useDrawerStore = create<IDrawerStore>()(
	persist(
		devtools((set) => ({
			openDrawer: true,
			setOpenDrawer: (openDrawer: boolean | undefined) => {
				set({ openDrawer });
			},
		})),
		{
			name: "drawer-store",
		}
	)
);

export default useDrawerStore;