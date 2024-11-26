"use client";

import { TableProps } from "antd";
import moment from 'moment';

export const StatisticBillColumnData = (
): TableProps<any>["columns"] => [
    {
      title: "Revenue",
      key: "revenue",
      width: "20%",
      dataIndex: "revenue",
      render: (item) => item.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      }),
    },
    {
      title: "Date",
      key: "date",
      width: "20%",
      dataIndex: "date",
      render: (item) => moment(item).format('MM/DD/YYYY')
    },
    {
      title: "Bills",
      key: "billQuantity",
      width: "20%",
      dataIndex: "billQuantity",
    },
    {
      title: "Products",
      key: "productQuantity",
      dataIndex: "productQuantity",
      width: "15%",
    },
  ];
