"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const athorize_1 = require("./util/athorize");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./Router");
const mongoose = require("mongoose");
const cors = require("cors");
const environment_1 = require("./environments/environment");
const winston = require("./util/logger");
const securityService = require("./services/security.service");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.initDB();
        this.express = express();
        this.middleware();
        this.initRouter();
        this.installApp();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(morgan("combined", { stream: winston.stream }));
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(athorize_1.authorize);
    }
    initDB() {
        const uri = `${environment_1.ENV.mongo.url}:${environment_1.ENV.mongo.port}/${environment_1.ENV.mongo.db}`;
        mongoose.connect(uri, { useNewUrlParser: true }).then(_ => {
            winston.LOGGER.info("Connected to DB.");
        }).catch(err => {
            winston.LOGGER.error(err);
        });
    }
    initRouter() {
        new router.Router(this.express);
    }
    installApp() {
        if (process.env.INSTALL || false) {
            securityService.createCredentials({
                user: "admin",
                password: "password"
            });
        }
    }
}
exports.default = new App().express;
