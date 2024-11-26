'use client'

import BillCreateForm from "@/app/admin/bills/createForm";
import { useBillPaged, useCreateBill } from "@/hooks/bill/useBill";
import { useAuthStore } from "@/stores";
import { ReactNode, useEffect, useState } from "react";
import AdminSideBar from "../drawer/sidebar";
import CustomModal from "../modal/CustomModal";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLO(props: AdminLayoutProps) {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const { resetStates, toggleProductList, productSelectList
  } = useBillPaged();
  const { user } = useAuthStore();
  const { mutate: onCreate } = useCreateBill(user?.username ?? "", () => {
    resetStates()
  })
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex overflow-hidden h-[100vh]">
      {mounted && <AdminSideBar openBillCreate={() => setOpenCreateDrawer(true)} />}
      <div className="w-full h-full ">
        <div className={`page-body overflow-y-scroll h-full`}>
          <div>{props.children}</div>
        </div>
      </div>
      <CustomModal
        width={`90vw`}
        onClose={() => setOpenCreateDrawer(false)}
        onOk={() => {
          onCreate(productSelectList)
          setOpenCreateDrawer(false)
        }}
        open={openCreateDrawer}
      >
        <BillCreateForm toggleProductList={toggleProductList}
          productSelectList={productSelectList} />
      </CustomModal>
    </div>
  );
}