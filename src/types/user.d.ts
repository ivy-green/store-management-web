export type IUser = {
    fullname: string
    username: string
    roleName: string
    phoneNumber: string
    bio: string
    resetPasswordToken: string
    email: string
    isEmailConfirmed: boolean
    isAccountBlocked: boolean
    roles: IRole[]
}