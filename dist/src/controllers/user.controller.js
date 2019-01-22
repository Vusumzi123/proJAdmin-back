"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator = require("validator");
const userService = require("../services/user.service");
const logger_1 = require("../util/logger");
/**
 * @class UserController
 * @method get
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 * @description
 * metodo para agregar un usuario a la base de datos
 *
 * @apiParam  {String} [email] username
 *
 * @apiSuccess (200) {Object} mixed `User` object
 */
exports.postUser = function (req, res, next) {
    logger_1.LOGGER.info("[userController]", req.body);
    const { firstName, lastName, email } = req.body;
    if (firstName && lastName && email && validator.isEmail(email))
        userService.createUser(req.body).then((saved) => {
            res.sendStatus(200).json({
                message: "user created successfully",
                timestamp: new Date().toJSON,
                id: saved._id
            });
        }).catch(err => {
            res.sendStatus(500).json(next);
        });
};
