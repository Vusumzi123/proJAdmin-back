import {Document, Schema, model, Model} from 'mongoose';
import {IRole} from '../interfaces/role.interface';

export interface IRoleModel extends IRole, Document{
}

export var RoleSchema: Schema = new Schema({
    cid: { type : Number, required : true },
    name: { type: String, required: true, index: { unique : true } },
    globalPerms: Boolean,
    privatePerms: Boolean
});

export const Role: Model<IRoleModel> = model<IRoleModel>("role", RoleSchema);