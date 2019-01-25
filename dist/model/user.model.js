"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cypher_1 = require("../util/cypher");
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
exports.UserSchema.pre('save', function (next) {
    let user = this;
    if (!this.isModified("password"))
        return next();
    const cypher = new cypher_1.Cypher();
    user.password = cypher.encrypt(user.password);
    return next();
});
exports.UserSchema.methods.comparePass = (passIn) => {
    const cypher = new cypher_1.Cypher();
    let dbPass = cypher.decrypt(this.passsword);
    return dbPass === passIn;
};
exports.UserSchema.methods.fullName = () => {
    return (`${this.firstName.trim()} ${this.lastName.trim()}`);
};
exports.User = mongoose_1.model("user", exports.UserSchema);
