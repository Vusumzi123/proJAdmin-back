import {IRole} from './role.interface';

export interface IUser {
    email?: string;
    firstName?: string;
    lastName?: string;
    roleId?:number;
    role?: IRole;
    project?: string;
    createdAt?: Date;
    password?: String;
}