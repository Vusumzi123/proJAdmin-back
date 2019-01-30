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
const projectService = require("../services/project.service");
const validator = require("validator");
const logger_1 = require("../util/logger");
exports.postProject = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectToCreate = req.body;
        try {
            let createdProject = yield projectService.createProject(projectToCreate);
            logger_1.LOGGER.debug(createdProject);
            res.json({ message: 'Project created succesfully', data: createdProject });
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.getProject = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = req.params.projectId;
        const query = validator.isEmail(projectId) ? { name: projectId } : { _id: projectId };
        try {
            const fetchedProject = yield projectService.readProjects(query);
            logger_1.LOGGER.debug(fetchedProject);
            res.json(fetchedProject);
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(404).json({ error: error.toString(), message: "project not found." });
        }
    });
};
exports.updateProject = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = req.params.projectId;
        const dataToUpdate = req.body;
        const query = validator.isEmail(projectId) ? { email: projectId } : { _id: projectId };
        try {
            const updatedProject = yield projectService.updateProject(query, dataToUpdate);
            logger_1.LOGGER.debug(exports.updateProject);
            res.json({ data: updatedProject, message: "project updated succesfully" });
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(404).json({ error: error.toString(), message: "project not found." });
        }
    });
};
exports.deleteProject = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = req.params.projectId;
        const query = validator.isEmail(projectId) ? { name: projectId } : { _id: projectId };
        try {
            const deletedProject = yield projectService.deleteProject(query);
            logger_1.LOGGER.debug(exports.deleteProject);
            res.json({ data: exports.deleteProject, message: "project deleted succesfully" });
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(404).json({ error: error.toString(), message: "project not found." });
        }
    });
};
