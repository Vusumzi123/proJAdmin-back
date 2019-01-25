import * as userModel from '../model/user.model';
import {IUser} from '../interfaces/user.interface';
import { LOGGER } from '../util/logger';

export var createUser = async function(user: IUser):Promise<userModel.IUserModel> {
    LOGGER.info("creating user")
    LOGGER.debug("user:", user)
    const newUser = new userModel.User(user);
    return newUser.save();
}

export var readUsers = async function(query: Object): Promise<userModel.IUserModel[]> {
    LOGGER.info("fetching user")
    LOGGER.debug("query:", query);
    return userModel.User.find(query).populate('role');
}

export var updateUser = async function(query:Object, userDataToUpdate: IUser): Promise<userModel.IUserModel> {
    LOGGER.info("updating user"); 
    LOGGER.debug(userDataToUpdate);
    return userModel.User.findOneAndUpdate(query, userDataToUpdate);
}

export var deleteUser = async function(query: Object): Promise<userModel.IUserModel> {
    LOGGER.info("deleting user");
    LOGGER.debug("query:", query);
    return userModel.User.findOneAndDelete(query);
}