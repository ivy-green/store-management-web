export type IUserRequest = {
    id?: string;
    fullname: string;
    username: string;
    password: string;
    phoneNumber: string;
    setAccountBlocked?: boolean;
    bio: string;
    email: string;
    roleCode?: number;
    branchCode: number;
    ReportToPersonUsername?: string;
}