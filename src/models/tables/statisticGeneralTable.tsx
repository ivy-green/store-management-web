"use client";

import { TableProps } from "antd";

export const StatisticGeneralColumnData = (
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
      title: "Bills",
      key: "bills",
      width: "20%",
      dataIndex: "bills",
    },
    {
      title: "Products",
      key: "products",
      width: "20%",
      dataIndex: "products",
    },
  ];
