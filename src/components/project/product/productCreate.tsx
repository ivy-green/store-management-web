import MyForm from '@/components/general/form/Form'
import MyFormInput from '@/components/general/form/FormInput'
import MyInput from '@/components/general/input/MyInput'
import { useProductStore } from '@/stores'
import React from 'react'

export default function ProductCreate() {
    return (
    <div>
        <MyInput 
            value={useProductStore.getState().name}
            onChange={(e) => useProductStore.setState({name: e.target.value})} />
        <MyForm onFinish={undefined} onFinishFailed={undefined}>
          <MyFormInput></MyFormInput>
        </MyForm>
    </div>
  )
}
