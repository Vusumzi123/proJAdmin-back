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
const userModel = require("../model/user.model");
const logger_1 = require("../util/logger");
exports.createUser = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("creating user");
        logger_1.LOGGER.debug("user:", user);
        const newUser = new userModel.User(user);
        return newUser.save();
    });
};
exports.readUsers = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("fetching user");
        logger_1.LOGGER.debug("query:", query);
        return userModel.User.find(query).populate('role');
    });
};
exports.updateUser = function (query, userDataToUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("updating user");
        logger_1.LOGGER.debug(userDataToUpdate);
        return userModel.User.findOneAndUpdate(query, userDataToUpdate);
    });
};
exports.deleteUser = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.LOGGER.info("deleting user");
        logger_1.LOGGER.debug("query:", query);
        return userModel.User.findOneAndDelete(query);
    });
};
