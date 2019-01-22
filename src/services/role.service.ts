import * as roleModel from '../model/role.model';
import {IRole} from '../interfaces/role.interface';
import { LOGGER } from '../util/logger';

export var readRole = async function(cId: number):Promise<roleModel.IRoleModel> {
    LOGGER.info("reading role")
    return roleModel.Role.findOne({cId: cId});
}