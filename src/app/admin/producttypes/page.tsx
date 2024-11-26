"use client";

import CustomModal from "@/components/general/modal/CustomModal";
import MyTable from "@/components/general/table/table";
import { useProductTypePaged } from "@/hooks/producttype/useProductType";
import { ProductTypeColumnData } from "@/models/tables/productTypeTable";
import { Button } from "antd";
import { useState } from "react";
import ProductTypeCreateForm from "./createForm";

export default function ProductTypesPage() {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const { ProductTypeList, initStates, setPageIndex, resetStates,
    onCreate, onUpdate, onRemove, RemoveConfirmDialogComponent,
  } = useProductTypePaged();

  return (
    <div className={`flex flex-row w-full gap-5`}>
      <div className={`w-full`}>
        <div className="flex flex-row items-center gap-2 mb-5">
          <div className={`text-[1.5em] font-semi-bold me-3 flex flex-row`}>
            Product Types
            <div className="ms-3 px-3 py-2 h-fit rounded-full text-sm text-white font-bold 
            flex flex-row items-center justify-center bg-slate-400">
              <div>{ProductTypeList?.totalRow}</div>
            </div>
          </div>
          <Button onClick={() => {
            resetStates()
            setOpenCreateDrawer(true)
          }}>Create</Button>
        </div>
        <MyTable
          data={ProductTypeList?.pageData}
          onPagingChange={setPageIndex}
          currentPageIndex={ProductTypeList?.pageIndex ? ProductTypeList?.pageIndex + 1 : 1}
          totalRows={ProductTypeList?.totalRow}
          columnData={ProductTypeColumnData(onRemove, (val) => {
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
        open={openCreateDrawer}>
        <ProductTypeCreateForm />
      </CustomModal>
      <CustomModal
        onClose={() => setOpenUpdateDrawer(false)}
        onOk={() => {
          onUpdate()
          setOpenUpdateDrawer(false)
        }}
        open={openUpdateDrawer}>
        <ProductTypeCreateForm />
      </CustomModal>
    </div>
  );
}
