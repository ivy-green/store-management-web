'use client'

import AdminLO from "@/components/general/layouts/AdminLO";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <AdminLO>
      {props.children}
      <Toaster />
    </AdminLO>
  );
}
