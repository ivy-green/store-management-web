import { HomeOutlined, PaperClipOutlined, ToolOutlined } from '@ant-design/icons';
import { Cube, Person } from 'phosphor-react';
import { ReactNode } from 'react';

interface DrawerItemProps {
    icon: ReactNode;
    label: string;
    link: string;
    roles?: string[];
}

export const SideNavData: DrawerItemProps[] = [
    {
        icon: <HomeOutlined size={18} />,
        label: 'Dashboard',
        link: '/admin',
    },
    {
        icon: <Person size={18} />,
        label: 'Users',
        link: '/admin/users',
        roles: ["Admin"]
    },
    {
        icon: <Cube size={18} />,
        label: 'Products',
        link: '/admin/products',
        roles: ["Admin", "Manager", "Staff"]
    },
    {
        icon: <ToolOutlined size={18} />,
        label: 'Product Types',
        link: '/admin/producttypes',
        roles: ["Admin", "Manager"],
    },
    {
        icon: <PaperClipOutlined size={18} />,
        label: 'Bills',
        link: '/admin/bills',
    },
]