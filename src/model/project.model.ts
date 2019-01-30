import { IProject } from "../interfaces/project.interface";
import { Document, Schema, model, Model } from "mongoose";

export interface IProjectModel extends IProject, Document{
    asignmentsCount?;
}

export var ProjectSchema: Schema = new Schema({
    name: {type: String, required: true},
    responsable: String,
    assignments: [String]
});

ProjectSchema.methods.asignmentsCount = function(): number{
    return this.assgnments.length;
}

export const Project: Model<IProjectModel> = model<IProjectModel>("project", ProjectSchema);