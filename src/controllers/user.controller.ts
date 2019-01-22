import {Request, Response, NextFunction} from 'express';
import * as validator from 'validator';
import * as userService from '../services/user.service';
import * as roleService from '../services/role.service';
import {IUser} from '../interfaces/user.interface';
import { LOGGER } from '../util/logger';
import { Cypher } from '../util/cypher';

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
        return next();
    }
    if(!userToSave.roleId){
        res.status(400).json({error: "the fiel roleId is required"});
        return next();
    }
    if(!validator.isEmail(userToSave.email)){
        res.status(400).json({error: "the field email is not an email"});
        return next();
    }


    try {
        role = await roleService.readRole(userToSave.roleId);
        userToSave['role'] = role;
        await userService.createUser( <IUser>req.body ).then((saved) => {
            res.status(200).json({
                message: "user created successfully",
                timestamp: saved.createdAt,
                id: saved._id
            });
        });
    } catch (error) {
        res.status(500).json({error: error});
        return next();
    }

} 

export var getUser = async function(req: Request, res: Response, next: NextFunction){
    LOGGER.debug("[UserController.getUserById]", req.params.userId);
    const userId = cypher.decrypt(req.params.userId);

    if(validator.isEmail(userId)){
        LOGGER.debug("[UserController.getUserByEmail]", userId);
        try {
            let fetchedUsr = await userService.readUsers({_id: userId});
            fetchedUsr[0]['passWord'] = null;
            res.status(200).json(fetchedUsr[0]);
        } catch (error) {
            res.status(404).json({error: error});
            return next();
        }
    }else{
        try {
            let fetchedUsr = await userService.readUsers({_id: userId});
            fetchedUsr[0]['passWord'] = null;
            res.status(200).json(fetchedUsr[0]);
        } catch (error) {
            res.status(404).json({error: error});
            return next();
        }
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
        res.status(500).json({error: error});
        return next();
    }
    
}