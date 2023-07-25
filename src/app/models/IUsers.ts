import { IUser } from "./IUser";

export interface IUsers {
    id: number,
    fullname: string,
    email: string,
    mobile: number,
    password: string | number,
    check: boolean,
    users: IUser[];
}