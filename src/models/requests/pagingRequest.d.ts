export interface IPagingList<T> {
    pageSize: number;
    pageIndex: number;
    hasPrev: boolean;
    hasNext: boolean;
    totalRow: number;
    pageCount: number;
    pageData: T[]
}

export interface IPagingRequest {
    pageIndex: number;
    pageSize: number;
    searchString?: string;
    categoryCode?: number;
    branchCode?: number;
    statuses?: string;
    roles?: string;
}