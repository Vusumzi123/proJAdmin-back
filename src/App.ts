import {authorize} from './util/athorize';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as router from './Router';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import {ENV} from './environments/environment';

import * as winston from './util/logger';
import * as securityService from './services/security.service';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.initDB();
        this.express = express();
        this.middleware();
        this.initRouter();
        this.installApp();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(morgan("combined", {stream: winston.stream}));
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(authorize);
    }

    private initDB(){
        const uri = `${ENV.mongo.url}:${ENV.mongo.port}/${ENV.mongo.db}`;
        mongoose.connect(uri, { useNewUrlParser: true }).then(_  => {
            winston.LOGGER.info("Connected to DB.");
        }).catch(err => {
            winston.LOGGER.error(err);
        })
    }

    private initRouter(){
        new router.Router(this.express);
    }

    private installApp(){
        if(process.env.INSTALL || false){
            securityService.createCredentials({
                user: "admin",
                password: "password"
            })
        }
    }
}

export default new App().express;