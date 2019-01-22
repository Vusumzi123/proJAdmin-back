import {Document, Schema, model, Model} from 'mongoose';
import {ISecurity} from '../interfaces/security.interfaces';
import { Cypher } from '../util/cypher';
import { LOGGER } from '../util/logger';

export interface ISecurityModel extends ISecurity, Document{
}

export var SecurirySchema: Schema = new Schema({
    user: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        index:{
            unique: true
        }
    }
});

SecurirySchema.pre('save', function(next) {
    let secCrd:ISecurityModel = this;
    if(!this.isModified("password")) return next();
    const cypher = new Cypher();
    secCrd.password =  cypher.encrypt(secCrd.password);
    return next();
});

export const Security: Model<ISecurityModel> = model<ISecurityModel>("security", SecurirySchema);