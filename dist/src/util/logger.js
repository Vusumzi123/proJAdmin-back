"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const appRoot = require("app-root-path");
const logform_1 = require("logform");
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
        level: 'debug',
        handleExceptions: true,
        json: true,
        timestap: true,
        colorize: true,
    },
};
const cliFormat = logform_1.format.cli({ colors: { info: 'blue' } });
const customFormat = logform_1.format.combine(logform_1.format.colorize(), logform_1.format.timestamp(), logform_1.format.align(), logform_1.format.printf(info => `${info.level}: ${info.timestamp} ${info.message}`));
const info = customFormat.transform({
    [LEVEL]: 'info',
    level: 'info',
    message: 'Listening'
});
exports.LOGGER = winston.createLogger({
    format: customFormat,
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
