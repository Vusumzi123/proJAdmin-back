import {Document, Schema, model, Model} from 'mongoose';
import {IUser} from '../interfaces/user.interface';
import { Binary } from 'bson';
import { Cypher } from '../util/cypher';

export interface IUserModel extends IUser, Document{
}

export var UserSchema: Schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    email: {
        type: String,
        required: [true, "the field email is required"],
        index: {
            unique: true
        }
    },
    firstName:{
        type: String,
        validator: firstName => firstName.length > 2,
        message: "firstName must be longer than 2 characters"
    },
    lastName: {
        type: String,
        validator: lastName => lastName.length > 2,
        message: "LastName must be longer than 2 characters"
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    },
    project: String,
    passsword: String,
    isValidated: {type: Boolean, default: false},
});

UserSchema.pre('save', function(next) {
    let user:IUserModel = this;
    if(!this.isModified("password")) return next();
    const cypher = new Cypher();
    user.password =  cypher.encrypt(user.password);
    return next();
});

UserSchema.methods.comparePass = (passIn): boolean => {
    const cypher = new Cypher();
    let dbPass = cypher.decrypt(this.passsword);
    return  dbPass === passIn; 
};

UserSchema.methods.fullName = (): string  =>{
    return (`${this.firstName.trim()} ${this.lastName.trim()}`);
}

export const User: Model<IUserModel> = model<IUserModel>("user", UserSchema);