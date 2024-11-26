import { Form } from 'antd'
import React, { ReactNode } from 'react'

interface MyFormProps {
    onFinish: any
    onFinishFailed: any
    children: ReactNode
}


export default function MyForm(props: MyFormProps) {
    const {onFinish, onFinishFailed, children} = props

  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {children} 
  </Form>
  )
}
