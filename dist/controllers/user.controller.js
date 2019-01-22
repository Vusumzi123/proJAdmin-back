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
            return next();
        }
        if (!userToSave.roleId) {
            res.status(400).json({ error: "the fiel roleId is required" });
            return next();
        }
        if (!validator.isEmail(userToSave.email)) {
            res.status(400).json({ error: "the field email is not an email" });
            return next();
        }
        try {
            role = yield roleService.readRole(userToSave.roleId);
            userToSave['role'] = role;
            yield userService.createUser(req.body).then((saved) => {
                res.status(200).json({
                    message: "user created successfully",
                    timestamp: saved.createdAt,
                    id: saved._id
                });
            });
        }
        catch (error) {
            res.status(500).json({ error: error });
            return next();
        }
    });
};
exports.getUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.debug("[UserController.getUserById]", req.params.userId);
        const userId = cypher.decrypt(req.params.userId);
        if (validator.isEmail(userId)) {
            logger_1.LOGGER.debug("[UserController.getUserByEmail]", userId);
            try {
                let fetchedUsr = yield userService.readUsers({ _id: userId });
                fetchedUsr[0]['passWord'] = null;
                res.status(200).json(fetchedUsr[0]);
            }
            catch (error) {
                res.status(404).json({ error: error });
                return next();
            }
        }
        else {
            try {
                let fetchedUsr = yield userService.readUsers({ _id: userId });
                fetchedUsr[0]['passWord'] = null;
                res.status(200).json(fetchedUsr[0]);
            }
            catch (error) {
                res.status(404).json({ error: error });
                return next();
            }
        }
    });
};
exports.updateUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userToUpdate = req.body;
        logger_1.LOGGER.debug("[UserController.updateUserById]", req.body);
        try {
            const updatedUser = yield userService.updateUser({ _id: req.param('userId') }, userToUpdate);
            res.status(200).json({
                message: "user updated successfully",
                timestamp: new Date().toString(),
                id: updatedUser._id
            });
        }
        catch (error) {
            res.status(500).json({ error: error });
            return next();
        }
    });
};
