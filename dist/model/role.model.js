"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.RoleSchema = new mongoose_1.Schema({
    cid: { type: Number, required: true },
    name: { type: String, required: true, index: { unique: true } },
    globalPerms: Boolean,
    privatePerms: Boolean
});
exports.Role = mongoose_1.model("role", exports.RoleSchema);
