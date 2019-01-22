import {Request, Response, NextFunction} from 'express';
import * as auth from 'basic-auth';
import * as securityService from '../services/security.service';
import { LOGGER } from './logger';
import { Cypher } from '../util/cypher';


export var authorize = function (req: Request, res: Response, next: NextFunction) {
    let admins = new Array;
    const cypher = new Cypher();
    securityService.readCredentials({user: "admin"})
        .then(fetched => {
            admins[fetched.user] = {password: cypher.decrypt(fetched.password)}
            var user = auth.parse(req.header('Authorization'))
            if(!user || !admins[user.name] || admins[user.name].password !== user.pass)
                res.status(401).json({error: "unauthorized"});
            return next();
        })
    
  };