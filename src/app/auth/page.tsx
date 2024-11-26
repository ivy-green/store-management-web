'use client'

import { URL_REGISTER } from "@/assets/contraints";
import { useLogin } from "@/hooks/auth/useLogin";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
    username: string;
    password: string;
    remember: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function LoginPage() {
    const { handleLogin, loading } = useLogin();
    const route = useRouter();

    return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw] overflow-hidden bg-[url('/img/leaf-bg-3.jpg')]">
            <div className="grid grid-cols-2 h-[70vh] w-[80vw] border shadow-sm bg-white rounded">
                <div className="bg-gray-500 h-full w-full bg-[url('/img/leaf-bg-2.jpg')]"></div>
                <div className={`mx-auto px-5 w-[90%]
                shadow-sm rounded translate-y-[20%] text-center`}>
                    <div className="text-dark font-bold text-lg uppercase my-5">Sign In</div>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 1, span: 7 }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 2, span: 18 }}>
                            <Button
                                onClick={() => {
                                    route.push(URL_REGISTER);
                                }}
                                className={`text-sm capitalize me-3 bg-blue-400 rounded py-2 px-3 text-white font-bold`} >
                                Go to Register
                            </Button>
                            <Button type="primary" loading={loading} htmlType="submit"
                                className={`bg-blue-400 rounded py-2 px-3 text-white font-bold`}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    }}
                    onError={() => {
                    console.log('Login Failed');
                    }}
                    useOneTap
                    auto_select
                />; */}
                </div>
            </div>
        </div>
    )
}
