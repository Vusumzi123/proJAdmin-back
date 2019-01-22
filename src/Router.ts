import * as e from 'express';
import * as userController from './controllers/user.controller'

export class  Router {
    constructor(express: e.Application) {
        this.routes(express);
    }
    // Configure API endpoints.
    public routes(express: e.Application): void {
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
            .get( userController.getUser);

        express.use(['/user', '/user/:userId'], router);

        // route to handle 404 not found endpoints
        router.get('*', function(req, res){
            res.status(404).json({error: "endpoint not found"});
        });
    }
}