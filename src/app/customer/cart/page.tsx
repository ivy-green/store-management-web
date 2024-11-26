'use client'

import { useBillPaged, useCreateBill } from "@/hooks/bill/useBill";
import { useCart } from "@/hooks/cart/useCart";
import { IProductResponse } from "@/models/responses/productResponses";
import { useAuthStore } from "@/stores";
import useBillStore from "@/stores/entities/useBillStore";
import { Form, Input } from "antd";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";

export default function ShoppingCartPage() {
    const { cartList, clearCartList } = useCart();
    const [form] = Form.useForm();
    const {
        customerFullname, phoneNumber, address,
        setCustomerFullname, setPhoneNumber, setAddress,
    } = useBillStore();
    const { resetStates } = useBillPaged();

    const { user } = useAuthStore();
    const { mutate: onCreate } = useCreateBill(user?.username ?? "", () => {
        clearCartList()
        resetStates()
    })

    useEffect(() => {
        form.setFieldsValue({ customerFullname });
        form.setFieldsValue({ phoneNumber });
        form.setFieldsValue({ address });
    }, [customerFullname, phoneNumber, address, form]);

    return (
        <div className="p-body h-[90vh] flex flex-col">
            <div className={`mb-5 text-xl font-bold text-dark`}>
                Shopping Cart
                <span className="ms-3 px-2 py-1 rounded bg-orange-500 text-white font-bold">
                    {cartList.length}
                </span>
            </div>
            <div className={`grid grid-cols-2 gap-5 flex-grow `}>
                <div className={`flex flex-col gap-3 overflow-y-auto`}>
                    {cartList && cartList.map((item, _index) => {
                        return <CartItem item={item} />
                    })}
                </div>
                <Form
                    initialValues={{
                        customerFullname,
                        phoneNumber,
                        address,
                    }}
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    style={{ width: 600 }}
                >
                    <div className={`flex flex-col gap-4 mt-auto border px-4 py-3 h-full`}>
                        <div>
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
                                <Input value={customerFullname} defaultValue={customerFullname}
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
                                <Input value={address} defaultValue={address}
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
                                <Input value={phoneNumber} defaultValue={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                            </Form.Item>
                        </div>
                        <div className="mt-auto">
                            <div className="grid grid-cols-2">
                                <div>Discount:</div>
                                <div className="text-end text-xl font-semibold text-dark">
                                    0
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Shipping fee:</div>
                                <div className="text-end text-xl font-semibold text-dark">
                                    0
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Total Price:</div>
                                <div className="text-end text-xl font-semibold text-dark">
                                    {cartList.map(x => x.price)
                                        .reduce((sum, current) => sum + current, 0)
                                        .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </div>
                            </div>
                            <div
                                className={`cursor-pointer mt-5 bg-orange-500 text-white py-3
                                    text-lg font-bold text-center shadow-lg rounded
                                    transition-all duration-75 border
                                    hover:bg-white hover:border-orange-500 hover:text-orange-500`}
                                onClick={() => {
                                    onCreate(cartList)
                                }}>
                                Check out
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

interface CartItemProps {
    item: IProductResponse
}

const CartItem = ({
    item
}: CartItemProps) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const updateQuantity = () => {
        quantity > 0 && setQuantity(quantity - 1)
    }

    return <div className={`px-5 py-6 border bg-white 
        flex flex-row gap-3 text-dark rounded-sm`}>
        <div className={`rounded h-[8em] w-[10em]
               bg-[url("/img/leaf-bg-2.jpg")] bg-cover bg-opacity-10`} />
        <div className="flex flex-col gap-3 mt-3">
            <div className={`font-semibold`}>{item.name}</div>
            <div>
                {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
            </div>
        </div>
        <div className={`ms-auto flex flex-row gap-3 items-center mt-auto`}>
            <div className="rounded-full border p-1 bg-orange-500 
               hover:border-orange-500 hover:bg-white hover:text-orange-500 
               text-white transition-all duration-75 cursor-pointer"
                onClick={() => quantity > 0 ? setQuantity(quantity - 1) : {}}
            >
                <CaretLeft size={18} />
            </div>
            <div>{quantity}</div>
            <div className="rounded-full border p-1 bg-orange-500 
               hover:border-orange-500 hover:bg-white hover:text-orange-500 
               text-white transition-all duration-75 cursor-pointer"
                onClick={() => quantity >= 0 ? setQuantity(quantity + 1) : {}}
            >
                <CaretRight size={18} />
            </div>
        </div>
    </div>
}
