import {Request, Response, NextFunction} from 'express';
import * as projectService from '../services/project.service';
import * as validator from 'validator';
import { IProject } from '../interfaces/project.interface';
import { LOGGER } from '../util/logger';

export var postProject = async function(req: Request, res: Response, next: NextFunction){
    const projectToCreate:IProject = req.body; 
    try{
        let createdProject = await projectService.createProject(projectToCreate);
        LOGGER.debug(createdProject);
        res.json({message: 'Project created succesfully', data: createdProject});
    }catch(error){
        LOGGER.error(error.toString());
        res.status(500).json({error: error.toString()});
    }
}

export var getProject = async function(req: Request, res: Response, next: NextFunction){
    const projectId = req.params.projectId;
    const query = validator.isEmail(projectId) ? {name: projectId} : {_id: projectId};
    try{
        const fetchedProject = await projectService.readProjects(query);
        LOGGER.debug(fetchedProject);
        res.json(fetchedProject);
    }catch(error){
        LOGGER.error(error.toString());
        res.status(404).json({error: error.toString(), message: "project not found."});
    }
}

export var updateProject = async function(req: Request, res: Response, next: NextFunction){
    const projectId = req.params.projectId;
    const dataToUpdate = req.body;
    const query = validator.isEmail(projectId) ? {email: projectId} : {_id: projectId};
    try{
        const updatedProject = await projectService.updateProject(query, dataToUpdate);
        LOGGER.debug(updateProject);
        res.json({data: updatedProject, message: "project updated succesfully"});
    }catch(error){
        LOGGER.error(error.toString());
        res.status(404).json({error: error.toString(), message: "project not found."});
    }
}

export var deleteProject = async function(req: Request, res: Response, next: NextFunction){
    const projectId = req.params.projectId;
    const query = validator.isEmail(projectId) ? {name: projectId} : {_id: projectId};
    try{
        const deletedProject = await projectService.deleteProject(query);
        LOGGER.debug(deleteProject);
        res.json({data: deleteProject, message: "project deleted succesfully"});
    }catch(error){
        LOGGER.error(error.toString());
        res.status(404).json({error: error.toString(), message: "project not found."});
    }
}