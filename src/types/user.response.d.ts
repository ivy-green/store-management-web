export type IUserResponse = {
    fullname: string;
    username: string;
    bio?: string;
    email: string;
    phoneNumber: string;
    password?: string;
    roleCode?: string;
    isAccountBlocked?: boolean;
    roles?: IRole[];
    branchData?: IBranchUserResponse
}

type IBranchUserResponse = {
    code: number
    name: string
}