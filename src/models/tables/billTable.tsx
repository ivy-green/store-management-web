"use client";

import { BillStatusData } from "@/assets/data/billStatus";
import { IBillResponse } from "@/types/bill.response";
import { TableProps, Tag } from "antd";
import moment from 'moment';

export interface BillTableModel {
  key: React.Key;
  code: number;
  total: number;
  status: number;
  createAt: string;
}

export const BillColumnData: TableProps<any>["columns"] = [
  {
    title: "Id",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "User",
    key: "username",
    dataIndex: "username",
  },
  {
    title: "CreateAt",
    key: "createAt",
    dataIndex: "createAt",
    render: (item) => moment(item).format('MM/DD/YYYY HH:mm:ss'),
    sorter: (a: string, b: string) => moment(a).valueOf() - moment(b).valueOf(),
  },
  {
    title: "Total",
    key: "totalPrice",
    width: "15%",
    dataIndex: "totalPrice",
    render: (item) => item.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    }),
    sorter: (a: IBillResponse, b: IBillResponse) =>
      a.totalPrice - b.totalPrice,
  },
  {
    title: "Discount",
    key: "discountPrice",
    width: "15%",
    dataIndex: "discountPrice",
    render: (item) => item.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    }),
    sorter: (a: IBillResponse, b: IBillResponse) =>
      a.discountPrice - b.discountPrice,
  },
  {
    title: "Status",
    key: "status",
    width: "10%",
    align: "center" as const,
    render: (item) => {
      return (
        <span>
          {item.status == 0 && (
            <Tag color={'blue'} key={item}>
              {BillStatusData[item.status].label}
            </Tag>
          ) ||
            item.status == 1 && (
              <Tag color={'volcano'} key={item}>
                {BillStatusData[item.status].label}
              </Tag>
            ) ||
            item.status == 2 && (
              <Tag color={'green'} key={item}>
                {BillStatusData[item.status].label}
              </Tag>
            ) ||
            item.status == 3 && (
              <Tag color={'red'} key={item}>
                {BillStatusData[item.status].label}
              </Tag>
            ) ||
            item.status == 4 && (
              <Tag color={'magenta'} key={item}>
                {BillStatusData[item.status].label}
              </Tag>
            ) ||
            item.status == 5 && (
              <Tag color={'cyan'} key={item}>
                {BillStatusData[item.status].label}
              </Tag>
            )}
        </span>
      )
    },
  },
];

export interface BillLoggerColumnDataModel {
  key: React.Key;
  action: string;
  username: string;
  note: string;
  timeSpan: string;
}

export const BillLoggerColumnData: TableProps<BillLoggerColumnDataModel>["columns"] = [
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
  {
    title: "Username",
    key: "username",
    dataIndex: "username",
  },
  {
    title: "Note",
    key: "note",
    dataIndex: "note",
  },
  {
    title: "timeSpan",
    key: "timeSpan",
    width: "15%",
    dataIndex: "timeSpan",
    render: (item) => moment(item).format('MM/DD/YYYY HH:mm:ss')
  },
]
