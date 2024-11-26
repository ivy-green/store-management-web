"use client";

import { IProductTypeResponse } from "@/types/productType.response";
import { Button, Space, TableProps } from "antd";
import { Pen, Trash } from "phosphor-react";

export interface ProductTypeTableModel {
  key: React.Key;
  code: number;
  name: string;
  desc: string;
  createAt: string;
}

export const ProductTypeColumnData = (
  onRemove: (val: number) => void,
  onUpdate: (val: IProductTypeResponse) => void,

): TableProps<any>["columns"] => [
    {
      title: "Name",
      key: "name",
      width: "25%",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "desc",
      dataIndex: "desc",
    },
    {
      title: "Create At",
      key: "createAt",
      dataIndex: "createAt",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => {
            onRemove(record.code)
          }}>
            <Trash size={15} weight="fill" />
          </Button>
          <Button onClick={() => {
            onUpdate(record)
          }}>
            <Pen size={15} weight="fill" />
          </Button>
        </Space>
      ),
    },
  ];
