"use client";

import { IBranchUserResponse, IUserResponse } from "@/types/user.response";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, Space, TableProps, Tag } from "antd";
import { Pen, Trash } from "phosphor-react";

export interface UserTableModel {
  key: React.Key;
  username: string;
  phoneNumber: string;
  email: string;
  fullname: string;
  isAccountBlocked: boolean;
  roles: string[];
  branchData: IBranchUserResponse;
}

export const UserColumnData = (
  onRemove: (val: string) => void,
  onUpdate?: (val: IUserResponse) => void,
): TableProps<UserTableModel>["columns"] => [
    {
      title: "Active",
      key: "isAccountBlocked",
      dataIndex: "isAccountBlocked",
      fixed: 'left',
      align: "center",
      render: (val: boolean) =>
        val
          ? <CloseCircleTwoTone twoToneColor="#C42C2C" style={{
            fontSize: 16
          }} />
          : <CheckCircleTwoTone twoToneColor="#52c41a" style={{
            fontSize: 16
          }} />
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      fixed: 'left',
      sorter: (a: UserTableModel, b: UserTableModel) =>
        a.username.localeCompare(b.username),
    },
    {
      title: "Fullname",
      key: "fullname",
      dataIndex: "fullname",
      width: "20%",
      sorter: (a: UserTableModel, b: UserTableModel) =>
        a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Branch",
      key: "branchData",
      width: "15%",
      dataIndex: "branchData",
      render: (val: IBranchUserResponse) =>
        val ? <>{val.name.charAt(0).toUpperCase() + val.name.slice(1)}</> : <></>
    },
    {
      title: "Role",
      key: "roles",
      dataIndex: "roles",
      filters: [
        {
          text: 'Admin',
          value: 'Admin',
        },
        {
          text: 'Manager',
          value: 'Manager',
        },
        {
          text: 'Staff',
          value: 'Staff',
        },
        {
          text: 'Shipper',
          value: 'Shipper',
        },
        {
          text: 'Customer',
          value: 'Customer',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.roles.includes(value as string),
      render: (tags: string[]) => (
        <span>
          {tags.map((tag) => {
            let color = tag == "Admin" ? 'geekblue' : 'green';
            if (tag === 'Manager') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),

    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => {
            onRemove(record.username)
          }}>
            <Trash size={15} weight="fill" />
          </Button>
          {onUpdate && <Button onClick={() => {
            onUpdate(record)
          }}>
            <Pen size={15} weight="fill" />
          </Button>}
        </Space>
      ),
    },
  ];
