"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./Router");
const mongoose = require("mongoose");
const winston = require("./util/logger");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.initDB();
        this.initRouter();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(morgan("combined", { stream: winston.stream }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    initDB() {
        //const uri = `${ENV.mongo.url}:${ENV.mongo.port}/${ENV.mongo.db}`;
        const uri = path.normalize("mongodb://127.0.0.1:27017/tests");
        mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
            if (err)
                winston.LOGGER.error(err.message);
            else
                winston.LOGGER.info("conencted to DB");
        });
    }
    initRouter() {
        new router.Router(this.express);
    }
}
exports.default = new App().express;
