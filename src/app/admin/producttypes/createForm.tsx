import { useProductTypePaged } from '@/hooks/producttype/useProductType';
import useProductTypeStore from '@/stores/entities/useProductTypeStore';
import { ReloadOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export default function ProductTypeCreateForm() {
  const [form] = Form.useForm();
  const { name, desc, setName, setDesc } = useProductTypeStore();
  const { resetStates } = useProductTypePaged();

  return (
    <div className='mx-5 my-4'>
      <div className='text-lg mb-5 flex flex-row'>
        <div>Create Form</div>
        <div className='cursor-pointer ms-3 hover:rotate-90 transition-all duration-75'
          onClick={() => {
            resetStates()
          }}>
          <ReloadOutlined size={12} />
        </div>
      </div>
      <Form
        initialValues={{
          name,
          desc,
        }}
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ width: 600 }}
      >
        <Form.Item
          label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Description">
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </Form.Item>
      </Form>
    </div >
  )
}
