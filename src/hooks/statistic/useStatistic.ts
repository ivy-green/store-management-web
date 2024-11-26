import { IPagingList } from "@/models/requests/pagingRequest";
import StatisticService from "@/services/StatisticService";
import { IStatisticBillResponse } from "@/types/statistic.response";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from 'date-fns';
import moment from "moment";
import { useEffect, useState } from "react";

const useStatistic = () => {
    const [statisticBillPaged, setStatisticBillPaged] =
        useState<IPagingList<IStatisticBillResponse> | undefined>(undefined);
    const queryClient = useQueryClient();

    const monthData = [
        {
            label: "January",
            value: 1,
        },
        {
            label: "February",
            value: 2,
        },
        {
            label: "March",
            value: 3,
        },
        {
            label: "April",
            value: 4,
        },
        {
            label: "May",
            value: 5,
        },
        {
            label: "June",
            value: 6,
        },
        {
            label: "July",
            value: 7,
        },
        {
            label: "August",
            value: 8,
        },
        {
            label: "September",
            value: 9,
        },
        {
            label: "October",
            value: 10,
        },
        {
            label: "November",
            value: 11,
        },
        {
            label: "December",
            value: 12,
        },
    ]

    const [revenueByDaysX, setRevenueByDaysX] = useState<number[]>([]);
    const [productsByDaysX, setProductsByDaysX] = useState<number[]>([]);
    const [billsByDaysX, setBillByDaysX] = useState<number[]>([]);

    const [revenueByDaysY, setRevenueByDaysY] = useState<string[]>([]);
    const [quantityByDaysY, setQuantityByDaysY] = useState<number[]>([]);

    const [numberOfDays, setNumberOfDays] = useState<number>(7);
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy/MM/dd'));

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [revenueByDaysDatePicked, setRevenueByDaysDatePicked] = useState(format(new Date(), 'yyyy/MM/dd'));
    const [generalMonth, setGeneralMonth] = useState(8);

    const setRevenueByDaysChartData = () => {
        let weekDays: string[] = [];
        let dataXs: number[] = [];
        let dataProductXs: number[] = [];
        let dataBillXs: number[] = [];

        for (let i = 0; i <= numberOfDays; i++) {
            let date = new Date(revenueByDaysDatePicked);
            let day = moment(date.setDate(date.getDate() + i)).format('YYYY-MM-DD')
            weekDays.push(day);
            if (billStatisticInDaysData?.pageData) {
                let dataX = billStatisticInDaysData.pageData.find((item) => item.date == day);

                dataXs.push(dataX?.revenue ?? 0);
                dataProductXs.push(dataX?.productQuantity ?? 0);
                dataBillXs.push(dataX?.billQuantity ?? 0);
            }
        }
        setRevenueByDaysY(weekDays);

        setProductsByDaysX(dataProductXs);
        setBillByDaysX(dataBillXs);
        setRevenueByDaysX(dataXs);
    }

    const { data: generalStatisticData, isPending: onGetGeneralStatisticDataAsync } = useQuery({
        queryKey: ["general"],
        queryFn: async () => await StatisticService.getGeneralStatistic({
            month: generalMonth
        }).then(async (res) => {
            if (res instanceof Object) {
                let resData = (await res)
                return resData.data
            }
            return res
        }),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const { data: billStatisticInDaysData, isPending: onGetBillStatisticInDaysDataAsync } = useQuery({
        queryKey: ["billStatisticDays"],
        queryFn: async () => await StatisticService.getBillStatisticByDays({
            startDate: revenueByDaysDatePicked,
            numberOfDays: numberOfDays
        }).then(async (res) => {
            if (res instanceof Object) {
                let resData = (await res)
                return resData.data
            }
            return res
        }),
        staleTime: 120000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["general"] });
    }, [generalMonth, queryClient]);

    useEffect(() => {
        setRevenueByDaysChartData();
    }, [billStatisticInDaysData, onGetBillStatisticInDaysDataAsync]);

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["billStatisticDays"] });
        setRevenueByDaysChartData();
    }, [revenueByDaysDatePicked, numberOfDays, queryClient]);

    return {
        setPageIndex,
        setPageSize,
        revenueByDaysX, revenueByDaysY, billsByDaysX, productsByDaysX,
        setSelectedDate, setNumberOfDays, numberOfDays,
        generalStatisticData, onGetGeneralStatisticDataAsync,
        billStatisticInDaysData, onGetBillStatisticInDaysDataAsync, setRevenueByDaysDatePicked,
        setGeneralMonth, generalMonth, monthData,
    }
}

export default useStatistic;