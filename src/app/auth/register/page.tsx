'use client'

import { URL_LOGIN } from "@/assets/contraints";
import { useRegister } from "@/hooks/auth/useRegister";
import { useCreateUser, useUserPaged } from "@/hooks/user/useUser";
import { useUserStore } from "@/stores";
import { Button, Form, FormProps, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type RegisterFieldType = {
    username: string;
    password: string;
    phoneNumber: string;
    confirmPassword: string;
    fullname: string;
    email: string;
    bio: string;
    roleCode: number;
};

const onFinishFailed: FormProps<RegisterFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function RegisterPage() {
    const { mutate: handleRegister, isPending: loading } = useRegister();
    const route = useRouter();
    const { fullname, username, password, roleCode, bio, email, branchCode, phoneNumber, reportTo,
        setFullName, setUsername, setPassword, setRoleCode, setBio, setEmail, setBranchCode, setPhoneNumber, setReportTo,
    } = useUserStore();
    const { mutate: onCreate } = useCreateUser();

    const [form] = Form.useForm();

    const roleSelectList = [
        {
            value: 4,
            label: 'Shipper'
        },
        {
            value: 5,
            label: 'Customer'
        },
    ]

    useEffect(() => {
        form.setFieldsValue({ username });
        form.setFieldsValue({ email });
        form.setFieldsValue({ fullname });
        form.setFieldsValue({ phoneNumber });
        form.setFieldsValue({ password });
        form.setFieldsValue({ roleCode });
        form.setFieldsValue({ branchCode });
        form.setFieldsValue({ bio });
    }, [fullname, username, password, phoneNumber, roleCode, bio, email, form, branchCode]);

    return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw] overflow-hidden bg-[url('/img/leaf-bg-3.jpg')]">
            <div className="grid grid-cols-2 h-[70vh] w-[80vw] border shadow-sm bg-white rounded">
                <div className="bg-gray-500 h-full w-full bg-[url('/img/leaf-bg-2.jpg')]"></div>
                <div className={`mx-auto px-5 w-[90%]
                shadow-sm rounded translate-y-[5%] text-center`}>
                    <div className="text-dark font-bold text-lg uppercase my-5">Register</div>
                    <Form
                        initialValues={{
                            fullname,
                            username,
                            roleCode,
                            phoneNumber,
                            bio,
                            email,
                            branchCode
                        }}
                        form={form}
                        name="basic"
                        layout="vertical"
                        labelCol={{ span: 18 }}
                        style={{ width: 600 }}
                        onFinish={handleRegister}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <Form.Item<RegisterFieldType>
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input onChange={(e) => setUsername(e.target.value)} />
                            </Form.Item>
                            <Form.Item<RegisterFieldType>
                                label="Fullname"
                                name="fullname"
                                rules={[{ required: true, message: 'Please input your fullname!' }]}
                            >
                                <Input onChange={(e) => setFullName(e.target.value)} />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="password2"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    type='password'
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "This field cannot empty!" },
                                () => ({
                                    validator(_, value) {
                                        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                                        if (regexp.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Invalid email!'));
                                    },
                                }),
                            ]}
                        >
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true }]}
                        >
                            <Input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Role" name={'roleCode'}>
                            <Select
                                placeholder="Select role"
                                optionFilterProp="label"
                                value={roleCode}
                                defaultValue={roleSelectList[0].value}
                                onChange={(e) => setRoleCode(e)}
                                options={roleSelectList}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 18 }}>
                            <Button
                                onClick={() => {
                                    route.push(URL_LOGIN);
                                }}
                                className={`text-sm capitalize me-3 bg-blue-400 rounded py-2 px-3 text-white font-bold`} >
                                Go to Login
                            </Button>
                            <Button type="primary" loading={loading}
                                htmlType="submit"
                                onClick={() => {
                                    onCreate()
                                }}
                                className={`bg-blue-400 rounded py-2 px-3 text-white font-bold`}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <GoogleRegister
                    onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    }}
                    onError={() => {
                    console.log('Register Failed');
                    }}
                    useOneTap
                    auto_select
                />; */}
                </div>
            </div>
        </div>
    )
}
