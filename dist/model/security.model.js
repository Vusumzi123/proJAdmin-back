"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cypher_1 = require("../util/cypher");
exports.SecurirySchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        index: {
            unique: true
        }
    }
});
exports.SecurirySchema.pre('save', function (next) {
    let secCrd = this;
    if (!this.isModified("password"))
        return next();
    const cypher = new cypher_1.Cypher();
    secCrd.password = cypher.encrypt(secCrd.password);
    return next();
});
exports.Security = mongoose_1.model("security", exports.SecurirySchema);
