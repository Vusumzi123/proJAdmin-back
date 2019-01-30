"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ProjectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    responsable: String,
    assignments: [String]
});
exports.ProjectSchema.methods.asignmentsCount = function () {
    return this.assgnments.length;
};
exports.Project = mongoose_1.model("project", exports.ProjectSchema);
