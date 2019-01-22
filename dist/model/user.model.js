"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    email: {
        type: String,
        required: [true, "the field email is required"],
        index: {
            unique: true
        }
    },
    firstName: {
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'role'
    },
    project: String,
    passsword: String,
    isValidated: { type: Boolean, default: false },
});
exports.UserSchema.methods.fullName = () => {
    return (`${this.firstName.trim()} ${this.lastName.trim()}`);
};
exports.User = mongoose_1.model("user", exports.UserSchema);
