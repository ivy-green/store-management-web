"use client";

import { IBranchResponse } from "@/types/branch.response";
import { Button, Space, TableProps } from "antd";
import { Pen, Trash } from "phosphor-react";

export interface BranchTableModel {
  key: React.Key;
  code: number;
  name: string;
  createAt: string;
}

export const BranchColumnData = (
  onRemove: (val: number) => void,
  onUpdate: (val: IBranchResponse) => void,

): TableProps<any>["columns"] => [
    {
      title: "Name",
      key: "name",
      width: "25%",
      dataIndex: "name",
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
          <Button onClick={() => {
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
