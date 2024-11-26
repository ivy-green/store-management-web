'use client'

import { URL_ADMIN, URL_CART, URL_HOME, URL_LOGIN, URL_PROFILE } from "@/assets/contraints";
import useLogout from "@/hooks/auth/useLogout";
import { useAuthStore } from "@/stores";
import { getHighestRole } from "@/utils/auth";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { SignIn, User } from "phosphor-react";
import { ReactNode, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";


interface CustomerLayoutProps {
  children: ReactNode;
}

export default function CustomerLayout(props: CustomerLayoutProps) {
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  const scrollDemoRef = useRef(null);

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const { scrollTop, scrollLeft } = scrollDemoRef.current;
      console.log(scrollTop);
      setScrollPosition({ scrollTop, scrollLeft });
    }
  };

  return (
    <div
      className="h-[100vh] overflow-y-scroll"
      onScroll={handleScroll}>
      <CustomerHeader isFixed={scrollPosition.scrollTop > 100} />
      <div>
        {props.children}
      </div>
      <Toaster />
    </div>
  )
}

interface CustomerHeaderProps {
  isFixed?: boolean
}

const CustomerHeader = ({
  isFixed = false
}: CustomerHeaderProps) => {
  var router = useRouter();
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  return <div className={`flex flex-row gap-5 p-header  
  shadow-sm text-primary ${isFixed && "fixed"}`}>
    <div
      className={`py-3 px-5 bg-orange-500 text-white font-bold
      cursor-pointer`}
      onClick={() => router.push(URL_HOME)}>
      LOGO
    </div>
    <div className="flex flex-row ms-auto gap-1">
      <div
        onClick={() => router.push(URL_CART)}
        className={`cursor-pointer bg-orange-50 px-5 flex flex-col justify-center
      hover:bg-white hover:text-orange-500
      transition-all duration-75`}>
        <ShoppingCartOutlined size={16} />
      </div>
      {user && <div
        onClick={() => getHighestRole() == "Customer"
          ? router.push(URL_PROFILE)
          : router.push(URL_ADMIN)}
        className={`cursor-pointer bg-orange-50 px-5 flex flex-col justify-center
      hover:bg-white hover:text-orange-500
      transition-all duration-75`}>
        <User size={16} />
      </div>}
      <div
        onClick={() => {
          handleLogout()
          router.push(URL_LOGIN)
        }}
        className={`cursor-pointer bg-orange-50 px-5 flex flex-col justify-center
      hover:bg-white hover:text-orange-500
      transition-all duration-75`}>
        <SignIn size={16} />
      </div>
    </div>
  </div>
}