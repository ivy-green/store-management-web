import { URL_ADMIN_PROFILE, URL_HOME } from "@/assets/contraints";
import { SideNavData } from "@/assets/data/sidenav";
import useLogout from "@/hooks/auth/useLogout";
import { useDrawer } from "@/hooks/drawer/useDrawer";
import { useAuthStore } from "@/stores";
import { getHighestRole } from "@/utils/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { HourglassMedium, Pencil, Plus } from "phosphor-react";
import { ReactNode } from "react";

interface AdminSideBarProps {
  openBillCreate: () => void
}

export default function AdminSideBar({ openBillCreate }: AdminSideBarProps) {
  const { openDrawer, toggleDrawer } = useDrawer();
  const pathname = usePathname()
  const { handleLogout } = useLogout();
  const { user, branchName } = useAuthStore();

  const router = useRouter();

  return (
    <>
      <div
        className={`h-[100vh] border text-gray-800 flex flex-col px-3 py-[0.5rem] 
        text-center 
        duration-75 transition-all 
        ${openDrawer ? `w-[15rem]` : `w-[4rem]`}`}
      >
        <div className="mb-5 mt-3 flex flex-row items-center justify-between">
          <div className={`bg-[url('/img/icons/profile.png')] rounded-full h-[3em] w-[3em] bg-cover`}></div>
          <div className="flex flex-col items-center flex-grow">
            <div className={`text-sm capitalize font-semibold mb-1`}>{user?.fullname}</div>
            <Tag className={`text-xs capitalize font-semi-bold`}>{branchName ?? "master"}</Tag>
          </div>
          <div>
            <div className="py-3 px-3 cursor-pointer rounded-full transaction-all duration-500 
            hover:text-orange-600 hover:bg-slate-200"
              onClick={() => router.push(URL_ADMIN_PROFILE)}>
              <Pencil size={16} />
            </div>
          </div>
        </div>

        {getHighestRole() != "Admin" && <div className={`w-full py-3 px-3 text-xs cursor-pointer text-dark font-bold border border-orange-600 
        hover:bg-orange-600 hover:text-white flex flex-row items-center gap-3 
        transition-all duration-75 mb-3`}
          onClick={openBillCreate}>
          <Plus size={12} />
          Create Bill
        </div>}

        {SideNavData && SideNavData.map((item, index) => {
          if (item.roles) {
            return item.roles.includes(getHighestRole()) &&
              <AdminSideBarItem key={index} icon={item.icon} label={item.label} link={item.link} active={pathname == item.link} />
          }

          return <AdminSideBarItem key={index} icon={item.icon} label={item.label} link={item.link} active={pathname == item.link} />;
        })}
        <AdminSideBarItem
          icon={<HourglassMedium />}
          className={`mt-auto`}
          label={`Customer Page`} link={URL_HOME}
          active={pathname == URL_HOME} />
        <AdminSideBarItem
          onClick={handleLogout}
          icon={<LogoutOutlined />}
          label={`Logout`}
          active={pathname == URL_HOME} />
        <Button className={` text-white rounded-sm bg-orange-600 hover:bg-slate-500`}
          onClick={toggleDrawer}>
          {openDrawer ? `<<` : ">>"}
        </Button>
      </div>
    </>
  );
}

export interface AdminSideBarItemProps {
  icon: ReactNode;
  label: string;
  link?: string;
  active?: boolean;
  className?: string;
  onClick?: () => {};
}

function AdminSideBarItem(props: AdminSideBarItemProps) {
  const { openDrawer } = useDrawer();
  const router = useRouter();

  return (
    <div
      className={`${props.className} cursor-pointer px-3 py-3 mb-[0.25em] rounded-sm 
      ${openDrawer ? "w-full" : "w-fit"} 
      hover:bg-gray-100 hover:text-orange-600 font-semibold 
      duration-75 transition-all flex flex-row gap-3 items-center text-center 
      ${props.active ? " bg-gray-100 text-orange-600" : " text-gray-700"}`}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        } else {
          router.push(props.link ?? "#")
        }
      }}
    >
      <div>{props.icon}</div>
      <div className={`duration-75 text-xs transition-all ${openDrawer ? "" : "hidden"}`}>
        {props.label}
      </div>
    </div>
  );
}
