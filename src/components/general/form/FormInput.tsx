import { Form } from 'antd'
import React from 'react'
import MyInput from '../input/MyInput'

export default function MyFormInput() {
  return (
      <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
      >
          <MyInput value={''} />
      </Form.Item>
  )
}
