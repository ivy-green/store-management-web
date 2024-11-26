"use client";

import CustomModal from "@/components/general/modal/CustomModal";
import MyTable from "@/components/general/table/table";
import { useBranchPaged } from "@/hooks/branch/useBranchPaged";
import { useUserPaged } from "@/hooks/user/useUser";
import { UserColumnData } from "@/models/tables/userTable";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Input, Select, Spin } from "antd";
import { SearchProps } from "antd/es/input";
import { Plus } from "phosphor-react";
import { useState } from "react";
import BranchPage from "../branches/page";
import UserCreateForm from "./createForm";
const { Search } = Input;

export default function UsersPage() {
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
    const [openBranchList, setOpenBranchList] = useState(false);
    const {
        UserList,
        onCreate, onRemove, onUpdate, initStates,
        setPageIndex,
        RemoveConfirmDialogComponent,
        reloadData,
        onSearch,
        searchValue, setSearchValue,
        onGetListAsync, setBranchFilderCode,
    } = useUserPaged();
    const onSearchHandle: SearchProps['onSearch'] = () => onSearch();
    const { selectList } = useBranchPaged();

    return (
        <div className={`flex flex-row w-full gap-5`}>
            <div className={`w-full`}>
                <div className="flex flex-row items-center gap-2 mb-3">
                    <div className={`text-[1.5em] font-semi-bold me-3`}>Users</div>
                    <Button onClick={() => setOpenCreateDrawer(true)}>
                        <Plus size={16} /> Create
                    </Button>
                    <Button onClick={() => setOpenBranchList(true)}>
                        <SettingOutlined /> Branch
                    </Button>
                    <Button onClick={reloadData}>
                        <ReloadOutlined />
                    </Button>
                    <Search placeholder="Search user by name or email"
                        onSearch={onSearchHandle}
                        value={searchValue}
                        onChange={(val) => setSearchValue(val.target.value)}
                        style={{
                            marginLeft: "auto",
                            width: "30vw",
                            height: "3em"
                        }}
                    />
                </div>
                <div className="flex flex-row gap-3 items-center mb-5">
                    <div>Filters: </div>
                    <Select
                        placeholder="Select branch"
                        optionFilterProp="label"
                        onChange={(e) => setBranchFilderCode(parseInt(e))}
                        options={selectList}
                    />
                    {/* <Select
                        mode="multiple"
                        tagRender={RolesMultiSelectList}
                        style={{ width: '100%' }}
                        options={UserRolesSelectList}
                    /> */}
                </div>
                {onGetListAsync ?
                    <Spin spinning={onGetListAsync} wrapperClassName="bg-gray-500 h-[100%] w-[100%]" /> :
                    <MyTable
                        currentPageIndex={UserList?.pageIndex ? UserList?.pageIndex + 1 : 1}
                        totalRows={UserList?.totalRow}
                        onPagingChange={setPageIndex}
                        data={UserList?.pageData}
                        columnData={UserColumnData(onRemove, (val) => {
                            initStates(val)
                            setOpenUpdateDrawer(true)
                        })}
                    />}
            </div>
            <RemoveConfirmDialogComponent />
            <CustomModal
                width="fit-content"
                onClose={() => setOpenCreateDrawer(false)}
                onOk={() => {
                    onCreate()
                    setOpenCreateDrawer(false)
                }}
                open={openCreateDrawer}>
                <UserCreateForm />
            </CustomModal>
            <CustomModal
                width="fit-content"
                onClose={() => setOpenUpdateDrawer(false)}
                onOk={() => {
                    onUpdate()
                    setOpenUpdateDrawer(false)
                }}
                open={openUpdateDrawer}>
                <UserCreateForm isCreate={false} />
            </CustomModal>
            <CustomModal
                width="fit-content"
                onClose={() => setOpenBranchList(false)}
                top="5vh"
                open={openBranchList}>
                <BranchPage />
            </CustomModal>
        </div>
    );
}


// type TagRender = SelectProps['tagRender'];

// // type OriginalTagRenderProps = Parameters<TagRender>[0];
// // type ExtendedTagRenderProps = OriginalTagRenderProps & UserRolesSelectListProps;

// interface CustomABC extends CustomTagProps {

// }

// const RolesMultiSelectList: TagRender = (props) => {
//     const { label, closable, onClose, color } = props;
//     const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
//         event.preventDefault();
//         event.stopPropagation();
//     };
//     return (
//         <Tag
//             color={color}
//             onMouseDown={onPreventMouseDown}
//             closable={closable}
//             onClose={onClose}
//             style={{ marginInlineEnd: 4 }}
//         >
//             {label}
//         </Tag>
//     );
// }

