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
const validator = require("validator");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const logger_1 = require("../util/logger");
const cypher_1 = require("../util/cypher");
const cypher = new cypher_1.Cypher();
/**
 * @class UserController
 * @method get
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 * @description
 * method used for saving a user un DB
 *
 * @apiParam  {String} [email] email
 *
 * @apiSuccess (200) {Object} mixed object
 */
exports.postUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.debug("[userController.postUser]:", req.body);
        let userToSave = req.body;
        let role;
        if (!userToSave.email) {
            res.status(400).json({ error: "the field email is required" });
            return;
        }
        if (!userToSave.roleId) {
            res.status(400).json({ error: "the field roleId is required" });
            return;
        }
        if (!validator.isEmail(userToSave.email)) {
            res.status(400).json({ error: "the field email is not an email" });
            return;
        }
        try {
            role = yield roleService.readRole(userToSave.roleId);
            userToSave['role'] = role;
            const savedUsr = yield userService.createUser(req.body);
            res.json({
                message: "user created successfully",
                timestamp: savedUsr.createdAt,
                id: savedUsr._id
            });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
        return;
    });
};
exports.getUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.debug("[UserController.getUserById]", req.params.userId);
        let userId = "";
        try {
            userId = cypher.decrypt(req.params.userId);
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(400).json({ error: error.toString() });
            return;
        }
        const query = validator.isEmail(userId) ? { email: userId } : { _id: userId };
        logger_1.LOGGER.debug("[UserController.getUserByEmail]", userId);
        try {
            let fetchedUsrs = yield userService.readUsers(query);
            const fetchedUsr = fetchedUsrs.pop();
            fetchedUsr.password = undefined;
            logger_1.LOGGER.debug(fetchedUsr);
            res.json(fetchedUsr);
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(404).json({ error: "no user found", message: error.toString() });
        }
    });
};
exports.updateUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userToUpdate = req.body;
        logger_1.LOGGER.debug("[UserController.updateUser", req.body);
        let userId = "";
        try {
            userId = cypher.decrypt(req.params.userId);
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(400).json({ error: error.toString() });
            return;
        }
        const query = validator.isEmail(userId) ? { email: userId } : { _id: userId };
        try {
            const updatedUser = yield userService.updateUser(query, userToUpdate);
            res.status(200).json({
                message: "user updated successfully",
                timestamp: new Date().toString(),
                id: updatedUser._id
            });
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.deleteUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.debug("[UserController.DeleteUser]", req.params.userId);
        let userId = "";
        try {
            userId = cypher.decrypt(req.params.userId);
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(400).json({ error: error.toString() });
            return;
        }
        const query = validator.isEmail(userId) ? { email: userId } : { _id: userId };
        try {
            const deletedUser = yield userService.deleteUser(query);
            res.json({
                message: "Usere deleted successfully",
                Timestamp: new Date().toString(),
                id: deletedUser._id
            });
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.getAllUsers = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.debug("[UserController.getAllUsers", req.params.query);
        let query = {};
        try {
            query = JSON.parse(cypher.decrypt(req.params.query));
        }
        catch (error) {
            logger_1.LOGGER.error(error.toString());
            res.status(400).json({ error: error.toString() });
            return;
        }
        try {
            const fetchedUsers = yield userService.readUsers(query);
            fetchedUsers.forEach(usr => {
                usr.password = undefined;
            });
            res.json(fetchedUsers);
        }
        catch (error) {
            logger_1.LOGGER.error({ error: error.toString(), message: "No users found with that criteria" });
        }
    });
};
