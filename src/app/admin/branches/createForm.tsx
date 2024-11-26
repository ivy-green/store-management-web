import useBranchStore from '@/stores/entities/useBranchStore';
import { Form, Input } from 'antd';

export default function BranchCreateForm() {
  const { name, setName } = useBranchStore();

  return (
    <Form
      layout="vertical"
      style={{ width: 600 }}
    >
      <Form.Item label="Name">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
    </Form>
  )
}
