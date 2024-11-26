'use client'

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function AdminLoading() {
    return <div className='h-[100vh] w-[100vw] absolute flex items-center justify-center '>
        <Spin indicator={<LoadingOutlined spin />} size="large" className='my-auto' />
    </div>
}
