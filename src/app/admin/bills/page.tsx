'use client'

import { BillStatusData } from "@/assets/data/billStatus";
import CustomBarChart from "@/components/general/charts/barChart";
import CustomDatePicker from "@/components/general/date/CustomDatePicker";
import DrawerCustom from "@/components/general/drawer/drawer";
import CustomModal from "@/components/general/modal/CustomModal";
import CustomMultiSelect from "@/components/general/select/CustomMultiSelect";
import MyTable from "@/components/general/table/table";
import { useBillPaged, useCreateBill } from "@/hooks/bill/useBill";
import useStatistic from "@/hooks/statistic/useStatistic";
import { BillColumnData, BillLoggerColumnData } from "@/models/tables/billTable";
import { StatisticBillColumnData } from "@/models/tables/statisticBillTable";
import { useAuthStore } from "@/stores";
import { IBillResponse } from "@/types/bill.response";
import { getHighestRole } from "@/utils/auth";
import { Button, Select, Spin, Tabs } from "antd";
import { useState } from "react";
import BillCreateForm from "./createForm";

export default function BillsPage() {
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openDetailsDrawer, setOpenDetailsDrawer] = useState(false);
    const [toggleTab, setToggleTab] = useState(false);
    const [detailsItem, setDetailsItem] = useState<IBillResponse | undefined>(undefined);
    const { user } = useAuthStore()

    const { BillList, toggleProductList, setPageIndex: setBillPageIndex,
        setBillStatusSelected, resetStates,
        productSelectList, onGetListAsync } = useBillPaged();

    const { mutate: onCreate } = useCreateBill(user?.username ?? "", () => {
        resetStates()
        setOpenCreateDrawer(false)
    })

    return (
        <div className={`flex flex-row w-full gap-5`}>
            <div className={`w-full`}>
                <div className="flex flex-row gap-2 mb-5">
                    <div className={`text-[1.5em] font-semi-bold me-3 flex flex-row`}>
                        Bills
                        <div className="ms-3 px-3 py-2 h-fit rounded-full text-sm text-white font-bold 
                            flex flex-row items-center justify-center bg-slate-400">
                            <div>{BillList?.totalRow}</div>
                        </div>
                    </div>
                    {/* <Button onClick={() => {
                        // resetProductSelectList() 
                        setOpenCreateDrawer(true)
                    }}>Create</Button> */}
                    {getHighestRole() != "Customer" && <Button
                        className={`${toggleTab ? "bg-blue-400" : "bg-orange-400"} text-white font-semibold`}
                        onClick={() => {
                            setToggleTab(v => !v)
                        }}>{toggleTab ? "Table" : "Statistic"}</Button>}
                </div>
                <div className={`max-h-[80vh]`}>
                    {toggleTab ?
                        <StatisticPage /> :
                        (onGetListAsync ?
                            <Spin spinning={onGetListAsync} fullscreen /> :
                            <div>
                                <CustomMultiSelect
                                    list={BillStatusData.filter(item => item.roles?.includes(getHighestRole()))}
                                    onSelect={(val) => setBillStatusSelected(val.map(i => i.value))} />
                                <MyTable
                                    data={BillList?.pageData}
                                    onPagingChange={setBillPageIndex}
                                    columnData={BillColumnData}
                                    onRowClick={(val) => {
                                        setOpenDetailsDrawer(true)
                                        setDetailsItem(val)
                                    }}
                                />
                            </div>)
                    }
                </div>
            </div>
            <CustomModal
                width={`90vw`}
                onClose={() => setOpenCreateDrawer(false)}
                onOk={() => {
                    onCreate(productSelectList)
                }}
                open={openCreateDrawer}
            >
                <BillCreateForm toggleProductList={toggleProductList}
                    productSelectList={productSelectList} />
            </CustomModal>
            <BillDetails open={openDetailsDrawer} onClose={() => setOpenDetailsDrawer(false)} data={detailsItem} />
        </div>
    );
}

interface BillDetailsProps {
    open: boolean,
    onClose: () => void,
    data?: IBillResponse
}

const BillDetails = ({
    open, onClose, data
}: BillDetailsProps) => {
    const { onUpdate, onUpdateAsync } = useBillPaged();
    const [trackingPagination, setTrackingPagination] = useState(1);

    return <DrawerCustom open={open} onClose={onClose} width={50}>
        {data ?
            <div className="flex flex-col h-[89vh]">
                <div className="flex flex-row items-center gap-3 text-xl uppercase font-bold text-slate-500">
                    {
                        typeof data["status"] == "number" &&
                        <div className={`bg-slate-400 text-white text-sm px-3 py-2 rounded font-bold`}>
                            {BillStatusData[data["status"]].label}
                        </div>
                    }
                    Bill Information
                    <div className={`ms-auto`}>
                        {/* new */}
                        {getHighestRole() != "Customer" && data.status == 0 && <div className="flex flex-row gap-3">
                            <Button
                                loading={onUpdateAsync}
                                onClick={() => onUpdate({
                                    billId: data.id,
                                    status: 2
                                })}
                                className="mt-auto">
                                Accept
                            </Button>
                            <Button
                                loading={onUpdateAsync}
                                onClick={() => onUpdate({
                                    billId: data.id,
                                    status: 3
                                })}
                                danger
                                className="mt-auto">
                                Reject
                            </Button>
                        </div>}
                        {/* reverted */}
                        {getHighestRole() != "Customer" && data.status == 1 && <div className="flex flex-row gap-3">
                            <Button
                                loading={onUpdateAsync}
                                onClick={() => onUpdate({
                                    billId: data.id,
                                    status: 2
                                })}
                                className="mt-auto">
                                Accept
                            </Button>
                            <Button
                                loading={onUpdateAsync}
                                onClick={() => onUpdate({
                                    billId: data.id,
                                    status: 3
                                })}
                                danger
                                className="mt-auto">
                                Reject
                            </Button>
                        </div>}
                        {/* rejected */}
                        {getHighestRole() != "Customer" && data.status == 3 && <Button
                            loading={onUpdateAsync}
                            onClick={() => onUpdate({
                                billId: data.id,
                                status: 1
                            })}
                            className="mt-auto">
                            Revert
                        </Button>}
                        {/* accepted */}
                        {getHighestRole() != "Customer" && data.status == 2 && <div className="flex flex-row gap-3">
                            <Button
                                loading={onUpdateAsync}
                                onClick={() => onUpdate({
                                    billId: data.id,
                                    status: 1
                                })}
                                className="mt-auto">
                                Revert
                            </Button>
                            <Button
                                loading={onUpdateAsync}
                                onClick={() => onUpdate({
                                    billId: data.id,
                                    status: 4
                                })}
                                danger
                                className="mt-auto">
                                Delivery
                            </Button>
                        </div>}
                        {/* deliveried */}
                        {getHighestRole() != "Customer" && data.status == 4 && <Button
                            loading={onUpdateAsync}
                            onClick={() => onUpdate({
                                billId: data.id,
                                status: 5
                            })}
                            className="mt-auto">
                            Finish
                        </Button>}
                    </div>
                </div>
                <div>
                    {Object.entries(data)
                        .filter(([key, _value]) => key !== 'billDetailsRequest')
                        .map(([key, val], index) => {
                            return key.toLowerCase() != "trackinglogger" &&
                                key.toLowerCase() != "status" &&
                                <div key={index} className="flex flex-row items-center">
                                    <div className="w-[30%] text-sm border-e-2 py-2">{key}:</div>
                                    <div className={`ms-3 px-3 py-2 my-1 rounded-lg w-fit text-dark 
                                            ${key.toLowerCase() == "id" && "bg-slate-400 text-white font-bold"}`}>
                                        {val.toString()}
                                    </div>
                                </div>
                        })}
                </div>
                <div className="flex-grow overflow-hidden">
                    <Tabs type="card" items={[
                        {
                            key: "1",
                            label: "Bill's Details",
                            children: <>
                                <div className="text-lg font-semibold mb-5">Bill Details</div>
                                <div className={`grid grid-cols-2 gap-3`}>
                                    {data.billDetailsRequest.map((item, index) => (
                                        <div key={index}
                                            className={`flex flex-row gap-5 border p-5`}>
                                            <div className={`text-sm font-bold`}>
                                                {item.productName}
                                            </div>
                                            <div className="ms-auto">
                                                {item.price.toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </div>
                                            <div>
                                                x {item.quantity}
                                            </div>
                                        </div>))}
                                </div>
                            </>,
                        },
                        {
                            key: "2",
                            label: "Bill's Tracking",
                            children: <>
                                <div className="text-lg font-semibold mb-5">Tracking Logger</div>
                                <MyTable
                                    data={data.trackingLogger}
                                    pageSize={4}
                                    currentPageIndex={trackingPagination}
                                    totalRows={data.trackingLogger.length}
                                    onPagingChange={(_index) =>
                                        _index < 0 ? setTrackingPagination(0)
                                            : setTrackingPagination(_index)}
                                    columnData={BillLoggerColumnData}
                                />
                            </>,
                        },
                    ]}>
                    </Tabs>
                </div>
            </div> :
            <div>hello</div>}
    </DrawerCustom>
}

const StatisticPage = () => {
    const {
        revenueByDaysX, revenueByDaysY,
        setRevenueByDaysDatePicked,
        numberOfDays, setNumberOfDays,
        setPageIndex: setStatisticPageIndex, onGetBillStatisticInDaysDataAsync,
        billStatisticInDaysData, billsByDaysX, productsByDaysX,
    } = useStatistic();

    const numberOfDaysData = [
        {
            label: "7",
            value: 7
        },
        {
            label: "14",
            value: 14
        },
        {
            label: "31",
            value: 31
        },
    ]

    return <div>
        <div className={`flex flex-row w-full gap-5`}>
            <div className={`w-full flex flex-col xl:flex-row gap-5 py-7 px-5 border-2 rounded`}>
                <div className={`w-full`}>
                    <div className="flex flex-col gap-3">
                        <div className="w-full h-[40vh]">
                            <CustomBarChart
                                chartType="bar"
                                yLabels={revenueByDaysY}
                                title="Revenue Statistic"
                                datasets={[
                                    {
                                        label: "Revenue",
                                        data: revenueByDaysX
                                    },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 h-[40vh]">
                            <CustomBarChart
                                chartType="pie"
                                title="Bills Statistic"
                                yLabels={revenueByDaysY.filter((_item, index) => billsByDaysX[index] != 0)}
                                datasets={[
                                    {
                                        label: "Bills",
                                        data: billsByDaysX.filter((_item, index) => billsByDaysX[index] != 0)
                                    },
                                ]}
                            />
                            <CustomBarChart
                                chartType="pie"
                                yLabels={revenueByDaysY.filter((_item, index) => billsByDaysX[index] != 0)}
                                title="Products Statistic"
                                datasets={[
                                    {
                                        label: "Products",
                                        data: productsByDaysX.filter((_item, index) => billsByDaysX[index] != 0)
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className={`w-full`}>
                    {onGetBillStatisticInDaysDataAsync ?
                        <Spin spinning={onGetBillStatisticInDaysDataAsync} fullscreen /> :
                        <div className="flex flex-col gap-2 w-full">
                            <div className="text-xs flex flex-row gap-3 items-center">
                                <div>Date Start: </div>
                                <CustomDatePicker onDatePicked={setRevenueByDaysDatePicked} />
                                <div>Days: </div>
                                <Select
                                    options={numberOfDaysData}
                                    defaultValue={numberOfDays}
                                    onChange={setNumberOfDays} />
                            </div>
                            <MyTable
                                currentPageIndex={billStatisticInDaysData?.pageIndex ?
                                    billStatisticInDaysData?.pageIndex + 1 : 1}
                                totalRows={billStatisticInDaysData?.totalRow}
                                onPagingChange={setStatisticPageIndex}
                                data={billStatisticInDaysData?.pageData}
                                columnData={StatisticBillColumnData()}
                            />
                        </div>}
                </div>
            </div>
        </div>
    </div>
}
