import {Request, Response, NextFunction} from 'express';
import * as validator from 'validator';
import * as userService from '../services/user.service';
import * as roleService from '../services/role.service';
import {IUser} from '../interfaces/user.interface';
import { LOGGER } from '../util/logger';
import { Cypher } from '../util/cypher';
import { IUserModel } from '../model/user.model';
import { Timestamp } from 'bson';

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
        const savedUsr = await userService.createUser( <IUser>req.body );
        res.json({
            message: "user created successfully",
            timestamp: savedUsr.createdAt,
            id: savedUsr._id
        });
    } catch (error) {
        res.status(500).json({error: error.toString()});
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
        let fetchedUsrs:IUserModel[] = await  userService.readUsers(query);
        const fetchedUsr = fetchedUsrs.pop();
        fetchedUsr.password = undefined;
        LOGGER.debug(fetchedUsr);
        res.json(fetchedUsr);
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(404).json({error: "no user found", message: error.toString()});
    }
}

export var updateUser = async function(req: Request, res: Response, next: NextFunction){
    const userToUpdate:IUser = req.body;
    LOGGER.debug("[UserController.updateUser", req.body);
    let userId = "";
    try {
        userId = cypher.decrypt(req.params.userId);
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(400).json({error: error.toString()});
        return;
    }
    const query = validator.isEmail(userId) ? {email: userId} : {_id: userId};
    try {
        const updatedUser = await userService.updateUser( query, userToUpdate);
        res.status(200).json({
            message: "user updated successfully" ,
            timestamp: new Date().toString(),
            id: updatedUser._id
        });
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(500).json({error: error.toString()});
    }
}

export var deleteUser = async function(req: Request, res: Response, next: NextFunction){
    LOGGER.debug("[UserController.DeleteUser]", req.params.userId);
    let userId = "";
    try {
        userId = cypher.decrypt(req.params.userId);
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(400).json({error: error.toString()});
        return;
    }
    const query = validator.isEmail(userId) ? {email: userId} : {_id: userId};
    try {
        const deletedUser: IUserModel = await userService.deleteUser(query);
        res.json({
            message: "Usere deleted successfully",
            Timestamp: new Date().toString(),
            id: deletedUser._id
        })
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(500).json({error: error.toString()});
    }
}

export var getAllUsers = async function(req: Request, res: Response, next: NextFunction){
    LOGGER.debug("[UserController.getAllUsers", req.params.query);
    let query:any = {};
    try {
        query = JSON.parse(cypher.decrypt(req.params.query));    
    } catch (error) {
        LOGGER.error(error.toString());
        res.status(400).json({error: error.toString()});
        return;
    }
    try {
        const fetchedUsers:IUserModel[] = await userService.readUsers(query);
        fetchedUsers.forEach(usr => {
            usr.password = undefined;
        })
        res.json(fetchedUsers);
    } catch (error) {
        LOGGER.error({error: error.toString(), message: "No users found with that criteria"})
    }

}