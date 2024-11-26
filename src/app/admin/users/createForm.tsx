import { useBranchPaged } from '@/hooks/branch/useBranchPaged';
import { useUserPaged } from '@/hooks/user/useUser';
import { useUserStore } from '@/stores';
import { CheckCircleTwoTone, CloseCircleTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Space, Switch } from 'antd';
import { DefaultOptionType } from "antd/es/select";
import { useEffect } from 'react';

interface UserCreateFormProps {
    isCreate?: boolean
}

export default function UserCreateForm({
    isCreate = true
}: UserCreateFormProps) {
    const [form] = Form.useForm();
    const { fullname, username, password, roleCode, bio,
        email, branchCode, phoneNumber, reportTo, isAccountBlocked,
        setFullName, setUsername, setPassword, setRoleCode, setIsAccountBlocked,
        setBio, setEmail, setBranchCode, setPhoneNumber, setReportTo,
    } = useUserStore();
    const { selectList } = useBranchPaged();
    const { managerSelectList } = useUserPaged();

    const roleSelectList: DefaultOptionType[] = [
        {
            label: "Admin",
            value: 1
        },
        {
            label: "Manager",
            value: 2
        },
        {
            label: "Staff",
            value: 3
        },
        {
            label: "Shipper",
            value: 4
        },
        {
            label: "Customer",
            value: 5
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
        form.setFieldsValue({ isAccountBlocked });
        form.setFieldsValue({ bio });
    }, [fullname, username, password, phoneNumber, roleCode,
        bio, email, form, branchCode, isAccountBlocked]);

    return (

        <div className='mx-5 my-4'>
            <div className='text-lg mb-5 flex flex-row'>
                <div className='flex flex-row gap-3'>
                    {isCreate ? "Create Form" : `Information`}
                </div>
                <div className='cursor-pointer ms-3' onClick={() => {
                    setFullName("")
                    setPassword("")
                    setPhoneNumber("")
                    setBio("")
                }}>
                    <ReloadOutlined size={12} />
                </div>
            </div>

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
                autoComplete="off"
                layout="vertical"
                style={{ width: 600 }}
            >
                <div className='ms-auto w-fit flex flex-row gap-2 items-center'>
                    <Space direction="vertical">
                        <Switch
                            checkedChildren="Actived" unCheckedChildren="Blocked"
                            onChange={() => setIsAccountBlocked(!isAccountBlocked)}
                            checked={!isAccountBlocked} />
                    </Space>
                    {isAccountBlocked
                        ? <div className='flex flex-row gap-2'>
                            <CloseCircleTwoTone twoToneColor="#C42C2C" style={{
                                fontSize: 16
                            }} />
                            <div>Blocked</div>
                        </div>
                        : <div className='flex flex-row gap-2'>
                            <CheckCircleTwoTone twoToneColor="#52c41a" style={{
                                fontSize: 16
                            }} />
                            <div>Active</div>
                        </div>}
                </div>
                <Form.Item
                    label="Username"
                    name="username"
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
                    ]}>
                    <Input
                        value={username}
                        disabled={!isCreate}
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <div className={`grid grid-cols-2 gap-3`}>
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
                        disabled={!isCreate}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Full Name"
                    name="fullname"
                    rules={[{ required: true }]}
                >
                    <Input
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                    />
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
                <Form.Item label="Bio">
                    <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)} />
                </Form.Item>
                <Form.Item label="Role" name={'roleCode'}>
                    <Select
                        placeholder="Select role"
                        optionFilterProp="label"
                        value={roleCode}
                        onChange={(e) => setRoleCode(e)}
                        options={roleSelectList}
                    />
                </Form.Item>
                {roleCode == 2 &&
                    <Form.Item
                        label="Branch"
                        name="branchCode"
                    >
                        <Select
                            placeholder="Select branch"
                            optionFilterProp="label"
                            value={branchCode}
                            onChange={(e) => setBranchCode(e)}
                            options={selectList}
                        />
                    </Form.Item>}
                {roleCode == 3 &&
                    <Form.Item
                        label="Report To"
                        name="reportTo"
                    >
                        <Select
                            placeholder="Select manager"
                            optionFilterProp="label"
                            value={reportTo}
                            onChange={(e) => setReportTo(e)}
                            options={managerSelectList}
                        />
                    </Form.Item>}
            </Form>
        </div>
    )
}
