"use client";

import { Drawer } from "antd";
import React, { useEffect, useState } from "react";


interface DrawerCustomProps {
  children: React.ReactNode
  width: number
  open: boolean
  onClose: () => void
}

let isResizing: boolean | null = null;

export default function DrawerCustom(props: DrawerCustomProps) {
  const { children, width, open, onClose } = props;
  const [drawerWidth, setDrawerWidth] = useState<number | undefined>(50);

  const cbHandleMouseMove = React.useCallback(handleMousemove, []);
  const cbHandleMouseUp = React.useCallback(handleMouseup, []);

  useEffect(() => {
    setDrawerWidth(width);
  }, [open]);

  function handleMouseup(e: any) {
    if (!isResizing) {
      return;
    }
    isResizing = false;
    document.removeEventListener("mousemove", cbHandleMouseMove);
    document.removeEventListener("mouseup", cbHandleMouseUp);
  }

  function handleMousedown(e: any) {
    e.stopPropagation();
    e.preventDefault();
    document.addEventListener("mousemove", cbHandleMouseMove);
    document.addEventListener("mouseup", cbHandleMouseUp);
    isResizing = true;
  }

  function handleMousemove(e: any) {
    let offsetRight =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    let minWidth = 256;
    let maxWidth = 600;
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      setDrawerWidth(offsetRight);
    }
  }

  return (
    <Drawer onClose={onClose} open={open} width={`${drawerWidth}%`}>
      {/* <div className={`w-[100vw] h-[100vh] cursor-pointer bg-slate-500 opacity-15 fixed top-0 left-0 z-10 ${!openDrawer && "hidden"}`}
        onClick={onClose}
      /> */}
      <div
        onMouseDown={handleMousedown}
        className={`sidebar-dragger`}
      >
      </div>
      <div>
        {children}
      </div>
    </Drawer>
  );
}

