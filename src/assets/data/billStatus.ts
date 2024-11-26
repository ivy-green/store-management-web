
export type item = {
    label: string,
    value: number,
    roles?: string[]
}

export const BillStatusData: item[] = [
    {
        label: "New",
        value: 0,
        roles: ["Admin", "Manager", "Staff"],
    },
    {
        label: "Reverted",
        value: 1,
        roles: ["Admin", "Manager", "Staff"],
    },
    {
        label: "Accepted",
        value: 2,
        roles: ["Admin", "Manager", "Staff", "Shipper"],
    },
    {
        label: "Rejected",
        value: 3,
        roles: ["Admin", "Manager", "Staff"],
    },
    {
        label: "Delivering",
        value: 4,
        roles: ["Admin", "Manager", "Staff", "Shipper"],
    },
    {
        label: "Finished",
        value: 5,
        roles: ["Admin", "Manager", "Staff", "Shipper"],
    },
]
