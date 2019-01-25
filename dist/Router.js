"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const userController = require("./controllers/user.controller");
class Router {
    constructor(express) {
        this.routes(express);
    }
    // Configure API endpoints.
    routes(express) {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = e.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        express.use('/', router);
        /*routes to handle user API*/
        router.post('/user', userController.postUser);
        router.route('/user/:userId')
            .get(userController.getUser)
            .put(userController.updateUser);
        express.use(['/user', '/user/:userId'], router);
        // route to handle 404 not found endpoints
        router.get('*', function (req, res) {
            res.status(404).json({ error: "endpoint not found" });
        });
    }
}
exports.Router = Router;
