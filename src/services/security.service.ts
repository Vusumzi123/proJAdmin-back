import * as securityModel from '../model/security.model';
import {ISecurity} from '../interfaces/security.interfaces';
import { LOGGER } from '../util/logger';

export var createCredentials = async function(credentials:ISecurity): Promise<securityModel.ISecurityModel> {
    const newCredentials = new securityModel.Security(credentials);
    return newCredentials.save()
}

export var readCredentials = async function(query: Object): Promise<securityModel.ISecurityModel> {
    return securityModel.Security.findOne(query);
}