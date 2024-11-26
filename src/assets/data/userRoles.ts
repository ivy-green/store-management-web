
export const UserRolesSelectList: UserRolesSelectListProps[] = [
    {
        label: 'Admin',
        text: 'Admin',
        value: 'Admin',
        color: 'red',
    },
    {
        label: 'Manager',
        text: 'Manager',
        value: 'Manager',
        color: 'blue',
    },
    {
        label: 'Staff',
        text: 'Staff',
        value: 'Staff',
        color: 'green',
    },
    {
        label: 'Shipper',
        text: 'Shipper',
        value: 'Shipper',
        color: 'volcano',
    },
    {
        label: 'Customer',
        text: 'Customer',
        value: 'Customer',
        color: 'purple',
    },
]

export type UserRolesSelectListProps = {
    color?: string
    text?: string
    label: string
    value: string
}