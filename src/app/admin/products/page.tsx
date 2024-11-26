"use client";

import CustomModal from "@/components/general/modal/CustomModal";
import MyTable from "@/components/general/table/table";
import useConfirmModal from "@/hooks/modal/useRemoveModal";
import { useProductPaged, useUpdateProductOnSale } from "@/hooks/product/useProduct";
import { useProductTypePaged } from "@/hooks/producttype/useProductType";
import { IProductResponse } from "@/models/responses/productResponses";
import { AdminProductColumnData, ProductColumnData } from "@/models/tables/productTable";
import { useAuthStore } from "@/stores";
import { getHighestRole } from "@/utils/auth";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Spin } from "antd";
import { Plus } from "phosphor-react";
import { useState } from "react";
import ProductCreateForm from "./createForm";
const { Search } = Input;

export default function ProductsPage() {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);

  const {
    productList, pageIndex, setPageIndex,
    initStates,
    onGetListAsync,
    onCreate,
    onUpdate,
    onRemove,
    RemoveConfirmDialogComponent,
    reloadData,
    resetStates,
    searchValue, setSearchValue,
    setCategoryCode
  } = useProductPaged();
  const { selectList } = useProductTypePaged();
  const { user } = useAuthStore();

  const { confirmRemove: updateStateConfirm, RemoveConfirmDialogComponent: ConfirmModal } = useConfirmModal();
  const { mutate: onUpdateState } = useUpdateProductOnSale(updateStateConfirm);

  return (
    <div className={`flex flex-row w-full gap-5`}>
      <div className={`w-full`}>
        <div className="flex flex-row items-center gap-2 mb-5">
          <div className={`text-[1.5em] font-semi-bold me-3 flex flex-row`}>
            Products
            <div className="ms-3 px-3 py-2 h-fit rounded-full text-sm text-white font-bold 
            flex flex-row items-center justify-center bg-slate-400">
              <div>{productList?.totalRow}</div>
            </div>
          </div>
          {getHighestRole() == "Admin" && <Button onClick={() => {
            setOpenCreateDrawer(true)
            resetStates()
          }}>
            <Plus size={16} /> Create
          </Button>}
          <Button onClick={reloadData}>
            <ReloadOutlined />
          </Button>
          <Select
            placeholder="Select a type"
            optionFilterProp="label"
            onChange={(e) => setCategoryCode(e)}
            options={selectList}
          />
          <div className="flex flex-row ms-auto">
            <Input placeholder="Search product by name"
              value={searchValue}
              onChange={(val) => setSearchValue(val.target.value)}
              style={{
                width: "30vw",
                height: "3em",
                paddingLeft: "1em",
                borderRadius: "5px 0 0 5px"
              }}
            />
            <div className="flex items-center text-white bg-slate-500 px-3 rounded-e-sm">
              <SearchOutlined />
            </div>
          </div>
        </div>
        <Spin spinning={onGetListAsync} fullscreen />
        {!onGetListAsync && <MyTable
          currentPageIndex={pageIndex + 1}
          totalRows={productList?.totalRow}
          data={productList?.pageData}
          onPagingChange={setPageIndex}
          columnData={getHighestRole() == "Admin"
            ? AdminProductColumnData(
              onRemove,
              (val: IProductResponse) => {
                initStates(val)
                setOpenUpdateDrawer(true)
              }) : ProductColumnData(
                onUpdateState,
                (val: IProductResponse) => {
                  initStates(val)
                  setOpenUpdateDrawer(true)
                })}
        />}
      </div>
      <CustomModal
        onClose={() => setOpenCreateDrawer(false)}
        width="fit-content"
        onOk={() => {
          onCreate({
            user: user?.username ?? "",
            onSuccess: function (): void {
              setOpenCreateDrawer(false);
            }
          })
        }}
        open={openCreateDrawer}>
        <ProductCreateForm />
      </CustomModal>
      <CustomModal
        onClose={() => setOpenUpdateDrawer(false)}
        width="fit-content"
        onOk={() => {
          onUpdate(user?.username ?? "")
          setOpenUpdateDrawer(false)
        }}
        open={openUpdateDrawer}>
        <ProductCreateForm />
      </CustomModal>
      <RemoveConfirmDialogComponent />
      <ConfirmModal />
    </div>
  );
}
