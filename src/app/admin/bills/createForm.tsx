import { useBillPaged } from "@/hooks/bill/useBill";
import { useProductPaged } from "@/hooks/product/useProduct";
import { useProductTypePaged } from "@/hooks/producttype/useProductType";
import { IProductResponse } from "@/models/responses/productResponses";
import useBillStore from "@/stores/entities/useBillStore";
import { Checkbox, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

interface BillCreateFormProps {
    toggleProductList: (val: IProductResponse) => void,
    productSelectList: IProductResponse[]
}

export default function BillCreateForm(props: BillCreateFormProps) {
    const [productConvertedList, setProductConvertedList] = useState<IProductResponse[] | undefined>([]);
    const { productList, setCategoryCode } = useProductPaged();
    const {
        toggleProductList,
        productSelectList
    } = props;
    const { selectList } = useProductTypePaged();
    const { isInclude } = useBillPaged();
    const {
        customerFullname, phoneNumber, address,
        setCustomerFullname, setPhoneNumber, setAddress,
    } = useBillStore();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ customerFullname });
        form.setFieldsValue({ phoneNumber });
        form.setFieldsValue({ address });
    }, [customerFullname, phoneNumber, address, form]);

    useEffect(() => {
        var temp = productList?.pageData.map((item) => ({ ...item, quantity: 1 }));
        setProductConvertedList(temp);
    }, [productList])

    return (
        <div key={Math.random()} className={`grid grid-cols-3 h-[70vh] gap-2 overflow-hidden`}>
            <div className="overflow-y-scroll h-full">
                <div className={`flex flex-row gap-3 items-center mb-5`}>
                    <div className={`text-lg font-semibold`}>Product List</div>
                    <Select
                        placeholder="Select a type"
                        optionFilterProp="label"
                        onChange={(e) => setCategoryCode(e)}
                        options={selectList}
                    />
                </div>
                <div className={`grid grid-cols-2 gap-5`}>
                    {productConvertedList && productConvertedList.map((item, index) => (
                        <BillCardItem key={index} index={index} toggleProductList={toggleProductList}
                            item={item} isInclude={isInclude(productSelectList, item)} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col h-full overflow-hidden">
                <div>Bill Information</div>
                <div className="overflow-y-scroll flex-grow-1">
                    {productSelectList && productSelectList.map((item, index) => {
                        return (
                            <BillCardItem key={index} index={index} toggleProductList={toggleProductList} item={item} />
                        )
                    })}
                </div>
                <div className={`mt-auto pt-3 mb-3 border-t-2 flex-grow-0`}>
                    <div className="grid grid-cols-2 gap-y-3">
                        <div className={`font-semibold text-lg`}>Total Items:</div>
                        <div className="text-lg ">
                            {productSelectList.map(x => x.quantity).reduce((sum, current) => sum + current, 0)}
                        </div>
                        <div className={`font-semibold text-lg`}>Total:</div>
                        <div className="text-lg ">
                            {productSelectList.map(x => x.price).reduce((sum, current) => sum + current, 0).toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND'
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className={`text-lg font-semibold mb-3`}>Delivery Information</div>
                <Form
                    initialValues={{
                        customerFullname,
                        phoneNumber,
                        address,
                    }}
                    form={form}
                    layout="vertical"
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label="Your fullname"
                        rules={[
                            { required: true, message: "This field cannot empty!" },
                            () => ({
                                validator(_, value) {
                                    if (value.length > 1) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('This field must have at least 1 character!'));
                                },
                            }),
                        ]}
                        name="fullname">
                        <Input value={customerFullname}
                            onChange={(e) => setCustomerFullname(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        rules={[
                            { required: true, message: "This field cannot empty!" },
                            () => ({
                                validator(_, value) {
                                    if (value.length > 1) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('This field must have at least 1 character!'));
                                },
                            }),
                        ]}
                        name="address">
                        <Input value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Phone number"
                        rules={[
                            { required: true, message: "This field cannot empty!" },
                            () => ({
                                validator(_, value) {
                                    if (value.length > 1) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('This field must have at least 1 character!'));
                                },
                            }),
                        ]}
                        name="phoneNumber">
                        <Input value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

interface BillCardItemProps {
    index: number,
    toggleProductList: (val: IProductResponse) => void,
    item: IProductResponse,
    isInclude?: boolean
}

const BillCardItem = (props: BillCardItemProps) => {
    return <div key={props.index}
        onClick={() => props.toggleProductList(props.item)}
        className={`grid-rows-1 flex flex-row items-center py-3 px-5 rounded shadow-sm border bg-white 
    hover:cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all duration-75`}>
        <div>
            {props.item.name} <br />
            {props.item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
        </div>
        {props.isInclude != undefined ? <Checkbox
            className={`ms-auto`}
            checked={props.isInclude}
            onChange={() => { }} /> :
            <div className="ms-auto py-2 px-3 rounded-full bg-[#3d3d3d] text-white font-bold">
                {props.item.quantity}
            </div>
        }
    </div>
}
