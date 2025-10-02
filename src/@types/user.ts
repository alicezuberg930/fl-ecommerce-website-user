export type IUser = {
    _id: string
    name: string
    email: string
    accountType: string
    isEmailVerified: boolean
    codeId: string
    codeExpired: string
}

export type IUserDetails = IUser & {

}

export interface IUserCreate extends Omit<IUser, 'accountType' | 'isEmailVerified' | '_id' | 'codeId' | 'codeExpired'> {
    password: string
}
