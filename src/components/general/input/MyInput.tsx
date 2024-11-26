import { Input } from 'antd'
import React from 'react'

interface MyInputProps {
    label?: string,
    value: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function MyInput(props: MyInputProps) {
    const { value, onChange, placeholder } = props

  return (
    <Input value={value} placeholder={placeholder} onChange={onChange}>
    </Input>
  )
}
