"use client";

import { IModalItem } from "@/components/models/tableModels";
import { Table, TableProps } from "antd";

interface MyTableProps {
  data?: any[];
  columnData: TableProps<any>["columns"];
  actionButtons?: IModalItem[]
  rowClassName?: (val: any) => string
  onRowClick?: (record: any) => void
  currentPageIndex?: number
  totalRows?: number
  pageSize?: number
  onPagingChange: (index: number) => void
}

export default function MyTable(props: MyTableProps) {
  const { columnData, data, rowClassName, onRowClick,
    totalRows, currentPageIndex, onPagingChange,
    pageSize = 10 } = props;

  return <>
    {data ? <Table
      dataSource={data}
      columns={columnData}
      rowKey={(record) => record.key ?? record.id ?? record.code ?? record.name ?? record.username ?? record.user}
      rowClassName={rowClassName + ` ${onRowClick && "hover:cursor-pointer"}`}
      onRow={(record, _rowIndex) => {
        return {
          onClick: () => onRowClick && onRowClick(record),
        };
      }}
      pagination={{
        current: currentPageIndex,
        pageSize: pageSize,
        total: totalRows,
        onChange: (page, _pageSize) => onPagingChange(page - 1),
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30']
      }}
    ></Table>
      : <div>No data</div>}
    {props.actionButtons && props.actionButtons.map(() => <></>)}
  </>;
}
