import ProductCreate from "./productCreate";

interface ITabTime {
    label: string
    key: string
    children: JSX.Element
}

export const ProductTableTabs : ITabTime[] = [
    {
        label: "Statistic",
        key: "1",
        children: <div>Hi</div>
    },
    {
        label: "Create",
        key: "2",
        children: <ProductCreate/>
    },
]