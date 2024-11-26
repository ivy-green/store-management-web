import useFile from '@/hooks/file/useFile';
import { useProductTypePaged } from '@/hooks/producttype/useProductType';
import { useProductStore } from '@/stores';
import { getHighestRole } from '@/utils/auth';
import { ReloadOutlined } from '@ant-design/icons';
import { Form, Image, Input, Select } from 'antd';
import { useEffect } from 'react';

export default function ProductCreateForm() {
    const [form] = Form.useForm();
    const { selectList } = useProductTypePaged();
    const { name, desc, price, quantity, productType,
        setName, setDesc, setPrice, setQuantity, setProductType
    } = useProductStore();
    const { previewOpen, previewImage,
        // fileList, handlePreview, handleChange, 
        setPreviewImage, setPreviewOpen } = useFile();

    useEffect(() => {
        form.setFieldsValue({ name });
        form.setFieldsValue({ desc });
        form.setFieldsValue({ price });
        form.setFieldsValue({ quantity });
        form.setFieldsValue({ productType });
    }, [name, desc, price, quantity, productType, form]);

    return (
        <div className='mx-5 my-4'>
            <div className='text-lg mb-5 flex flex-row'>
                <div>Information Form</div>
                <div className='cursor-pointer ms-3' onClick={() => {
                    setName("")
                    setDesc("")
                    setPrice(0)
                    setQuantity(0)
                }}>
                    <ReloadOutlined size={12} />
                </div>
            </div>
            <Form
                initialValues={{
                    name,
                    desc,
                    price,
                    quantity,
                    productType
                }}
                form={form}
                layout="vertical"
                autoComplete="off"
                style={{ width: 600 }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "This field cannot empty!" },
                        () => ({
                            validator(_, value) {
                                if (value.length > 1) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Name must have at least 1 character!'));
                            },
                        }),
                    ]}
                >
                    <Input name={'name'} value={name} onChange={(e) => setName(e.target.value)}
                        disabled={!(getHighestRole() == "Admin")} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="desc"
                >
                    <Input value={desc} onChange={(e) => setDesc(e.target.value)} disabled={!(getHighestRole() == "Admin")} />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name={"price"}
                    rules={[{ required: true, message: "This field cannot empty!" },
                    () => ({
                        validator(_, value) {
                            if (parseInt(value) < 1000) {
                                return Promise.reject(new Error('Price must be at least 1.000 VND'));
                            }
                            return Promise.resolve();
                        },
                    }),]}>
                    <Input value={price} onChange={(e) => setPrice(Number(e.target.value))} disabled={!(getHighestRole() == "Admin")} />
                </Form.Item>
                <Form.Item label="Quantity">
                    <Input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                </Form.Item>
                <Form.Item
                    label="Product Type"
                    name="productType"
                    rules={[
                        { required: true, message: "This field cannot empty!" }]}
                >
                    <Select
                        placeholder="Select a type"
                        optionFilterProp="label"
                        value={productType}
                        onChange={(e) => setProductType(e)}
                        options={selectList}
                        disabled={!(getHighestRole() == "Admin")}
                    />
                </Form.Item>
                {/* <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    onPreview={handlePreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload> */}
                {previewImage && <Image
                    alt='previewImage'
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />}
            </Form>
        </div >
    )
}
