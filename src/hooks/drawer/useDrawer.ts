import { useDrawerStore } from "@/stores";

export const useDrawer = () => {
    const {openDrawer} = useDrawerStore();

    const toggleDrawer = () => {
        useDrawerStore.setState({openDrawer: !openDrawer});
    };

    return { openDrawer, toggleDrawer };
}
