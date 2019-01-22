"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
});
exports.UserSchema.pre("save", (next) => {
    if (this.createdAt)
        this.createdAt = new Date();
    next();
});
exports.UserSchema.methods.fullName = () => {
    return (`${this.firstName.trim()} ${this.lastName.trim()}`);
};
exports.User = mongoose_1.model("User", exports.UserSchema);
