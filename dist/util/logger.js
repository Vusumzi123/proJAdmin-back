"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const appRoot = require("app-root-path");
const LEVEL = Symbol.for('level');
var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        timestap: true,
        colorize: false,
    },
    console: {
        level: process.env.LEVEL || 'info',
        format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.simple()),
        handleExceptions: true,
        json: true,
        timestap: true,
        colorize: true,
    },
};
exports.LOGGER = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});
exports.stream = {
    write: function (meta) {
        exports.LOGGER.info(meta);
    }
};
