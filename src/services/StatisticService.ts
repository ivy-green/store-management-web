import { API_STATISTIC_GENERAL, API_STATISTIC_REVENUE, API_STATISTIC_REVENUE_BY_DAYS } from "@/assets/contraints";
import instance from "@/config/axiosConfig";
import catchAsync from "@/config/catchAsync";
import { IPagingList, IPagingRequest } from "@/models/requests/pagingRequest";
import { IStatisticBillResponse, IStatisticGeneralResponse } from "@/types/statistic.response";

const StatisticService = {
    getRevenue: catchAsync((params: IPagingRequest)
        : Promise<ServerResponse<IPagingList<IStatisticBillResponse>>> => {
        return instance.get(API_STATISTIC_REVENUE, {
            params: params
        });
    }),
    getGeneralStatistic: catchAsync((params: {
        month: number
    })
        : Promise<ServerResponse<IStatisticGeneralResponse>> => {
        return instance.get(API_STATISTIC_GENERAL, {
            params: params
        });
    }),
    getBillStatisticByDays: catchAsync((params: {
        startDate: string,
        numberOfDays: number,
    })
        : Promise<ServerResponse<IPagingList<IStatisticBillResponse>>> => {
        return instance.get(API_STATISTIC_REVENUE_BY_DAYS, {
            params: params
        });
    }),
}

export default StatisticService

