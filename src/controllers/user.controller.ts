import {Request, Response, NextFunction} from 'express';
import * as validator from 'validator';
import * as userService from '../services/user.service';
import * as roleService from '../services/role.service';
import {IUser} from '../interfaces/user.interface';
import { LOGGER } from '../util/logger';
import { Cypher } from '../util/cypher';
import { IUserModel } from '../model/user.model';

const cypher = new Cypher();
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
export var postUser = async function(req: Request, res: Response, next: NextFunction){
    LOGGER.debug("[userController.postUser]:",req.body);
    let userToSave = req.body;
    let role;
    if(!userToSave.email){
        res.status(400).json({error: "the field email is required"});
        return;
    }
    if(!userToSave.roleId){
        res.status(400).json({error: "the field roleId is required"});
        return;
    }
    if(!validator.isEmail(userToSave.email)){
        res.status(400).json({error: "the field email is not an email"});
        return;
    }
    try {
        role = await roleService.readRole(userToSave.roleId);
        userToSave['role'] = role;
        await userService.createUser( <IUser>req.body ).then((saved) => {
            res.json({
                message: "user created successfully",
                timestamp: saved.createdAt,
                id: saved._id
            });
        });
    } catch (error) {
        res.status(500).json({error: error.toString()});
        return;
    }
    return;
} 

export var getUser = async function(req: Request, res: Response, next: NextFunction){
    LOGGER.debug("[UserController.getUserById]", req.params.userId);
    let userId = "";
    try {
        userId = cypher.decrypt(req.params.userId);
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(400).json({error: error.toString()});
        return;
    }
    const query = validator.isEmail(userId) ? {email: userId}: {_id: userId};
    LOGGER.debug("[UserController.getUserByEmail]", userId);
    try {
        const fetchedUsr:IUserModel[] = await  userService.readUsers(query);
        LOGGER.debug(fetchedUsr);
        fetchedUsr[0].password = null;
        res.json(fetchedUsr[0]);
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(404).json({error: "no user found", message: error.toString()});
        return;
    }
}

export var updateUser = async function(req: Request, res: Response, next: NextFunction){
    const userToUpdate:IUser = req.body;
    LOGGER.debug("[UserController.updateUserById]", req.body);
    try {
        const updatedUser = await userService.updateUser( {_id: req.param('userId') }, userToUpdate);
        res.status(200).json({
            message: "user updated successfully" ,
            timestamp: new Date().toString(),
            id: updatedUser._id
        });
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(500).json({error: error.toString()});
        return;
    }
    
}