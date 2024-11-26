"use client";

import { Button, Popover, Space, TableProps, Tag } from "antd";
import moment from "moment";
import { Pen, Trash } from "phosphor-react";
import { IProductResponse } from "../responses/productResponses";

export const ProductColumnData = (
  onUpdateState: (val?: number) => void,
  onUpdate?: (val: IProductResponse) => void,
  onRemove?: (val: number) => void,
): TableProps<IProductResponse>["columns"] => {
  return [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      sorter: (a: IProductResponse, b: IProductResponse) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Type",
      key: "type",
      width: "15%",
      dataIndex: "type",
      render: item => item.name,
    },
    {
      title: "Price",
      key: "price",
      width: "15%",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      width: "10%",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "On Sale",
      key: "isOnSale",
      dataIndex: "isOnSale",
      width: "10%",
      render: (_, record) => (
        <Popover
          className="cursor-pointer"
          placement="right" content={record.isOnSale ? "Turn Sale Off" : "Turn Sale On"}>
          <div
            onClick={() => onUpdateState(record.code)}>
            {record.isOnSale
              ? <Tag color={'green'} key={record.code}>On Sale</Tag>
              : <Tag color={'red'} key={record.code}>Off Sale</Tag>}
          </div>
        </Popover>)
    },
    {
      title: "Create At",
      key: "createAt",
      dataIndex: "createAt",
      width: "10%",
      render: item => moment(item).format('MM/DD/YYYY HH:mm:ss'),

    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_, record) => (
        <Space size="middle">
          {onRemove && <Button danger onClick={() => {
            onRemove(record.code ?? -1)
          }}>
            <Trash size={15} weight="fill" />
          </Button>}
          {onUpdate && <Button onClick={() => {
            onUpdate(record)
          }}>
            <Pen size={15} weight="fill" />
          </Button>}
        </Space>
      ),
    },
  ]
};

export const AdminProductColumnData = (
  onRemove: (val: number) => void,
  onUpdate: (val: IProductResponse) => void,
): TableProps<IProductResponse>["columns"] => {
  return [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      sorter: (a: IProductResponse, b: IProductResponse) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Type",
      key: "type",
      width: "15%",
      dataIndex: "type",
      render: item => item.name,
    },
    {
      title: "Price",
      key: "price",
      width: "15%",
      dataIndex: "price",
    },
    {
      title: "User Create",
      key: "creatorUsername",
      dataIndex: "creatorUsername",
      width: "10%",
    },
    {
      title: "Create At",
      key: "createAt",
      dataIndex: "createAt",
      width: "10%",
      render: item => moment(item).format('MM/DD/YYYY HH:mm:ss'),

    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => {
            onRemove(record.code ?? -1)
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
  ]
};
