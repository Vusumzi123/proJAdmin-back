"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../util/logger");
const project_model_1 = require("../model/project.model");
exports.createProject = function (project) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("creating projetc");
        logger_1.LOGGER.debug("project:", project);
        const newProject = new project_model_1.Project(project);
        return newProject.save();
    });
};
exports.readProjects = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("fetching project");
        logger_1.LOGGER.debug("query:", query);
        return project_model_1.Project.find(query).populate('assignments');
    });
};
exports.updateProject = function (query, projectDataToUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("updating projetc");
        logger_1.LOGGER.debug(projectDataToUpdate);
        return project_model_1.Project.findOneAndUpdate(query, projectDataToUpdate);
    });
};
exports.deleteProject = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("deleting projetc");
        logger_1.LOGGER.debug("query:", query);
        return project_model_1.Project.findOneAndDelete(query);
    });
};
