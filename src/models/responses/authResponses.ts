export type ILoginResponse = {
    accessToken: string;
    refreshToken: string;
    branchCode: number;
    branchName: string;
    roles?: IRole[];
    roleName?: string;
}

export type IRole = {
    code: number;
    rolename: string;
}

export type IRegisterRequest = {
    username: string;
    password: string;
    roleCode: number;
}