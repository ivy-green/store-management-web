"use client";

import CustomModal from "@/components/general/modal/CustomModal";
import MyTable from "@/components/general/table/table";
import { useBranchPaged } from "@/hooks/branch/useBranchPaged";
import { BranchColumnData } from "@/models/tables/branchTable";
import { Button } from "antd";
import { useState } from "react";
import BranchCreateForm from "./createForm";

export default function BranchPage() {
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
    const { BranchList, initStates, setPageIndex,
        onCreate, onUpdate, onRemove, RemoveConfirmDialogComponent,
    } = useBranchPaged();

    return (
        <div className={`flex flex-row w-[80vw] h-[80vh] gap-5`}>
            <div className={`w-full`}>
                <div className="flex flex-row items-center gap-2 mb-5">
                    <div className={`text-[1.5em] font-semi-bold me-3 flex flex-row`}>
                        Branches
                        <div className="ms-3 px-3 py-2 h-fit rounded-full text-sm text-white font-bold flex flex-row items-center justify-center bg-slate-400">
                            <div>{BranchList?.totalRow}</div>
                        </div>
                    </div>
                    <Button onClick={() => setOpenCreateDrawer(true)}>Create</Button>
                </div>
                <MyTable
                    onPagingChange={setPageIndex}
                    currentPageIndex={BranchList?.pageIndex ? BranchList?.pageIndex + 1 : 1}
                    totalRows={BranchList?.totalRow}
                    data={BranchList?.pageData}
                    columnData={BranchColumnData(onRemove, (val) => {
                        initStates(val)
                        setOpenUpdateDrawer(true)
                    })}
                />
            </div>
            <RemoveConfirmDialogComponent />
            <CustomModal
                onClose={() => setOpenCreateDrawer(false)}
                onOk={() => {
                    onCreate()
                    setOpenCreateDrawer(false)
                }}
                top="20vh"
                open={openCreateDrawer}>
                <BranchCreateForm />
            </CustomModal>
            <CustomModal
                onClose={() => setOpenUpdateDrawer(false)}
                onOk={() => {
                    onUpdate()
                    setOpenUpdateDrawer(false)
                }}
                open={openUpdateDrawer}>
                <BranchCreateForm />
            </CustomModal>
        </div>
    );
}
