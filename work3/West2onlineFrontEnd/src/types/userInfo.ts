// types/userInfo.ts

// define a Form of validating data
export interface RuleForm{
    username: string | undefined,
    password: string | undefined,
    confirmed?: string | undefined,
    email?: string | undefined,
}

// define the login status
export  interface LoginStatus {
    isLoggedIn: boolean | undefined,
    noLoginAgain: boolean | undefined,
    checkedDate: string | undefined,
}

// define a Form of user info
export interface UserInfo{
    id?:string | undefined,
    username:string | undefined,
    password:string | undefined,
    email:string | undefined,
    noLoginAgain?:boolean,
    checkedDate?:string,
    isLoggedIn?:boolean,
}

// define a collection of User's InfoForm
export type UserInfoCollection = Array<UserInfo>;
