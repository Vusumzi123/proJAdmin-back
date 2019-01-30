
import { LOGGER } from '../util/logger';
import { IProject } from '../interfaces/project.interface';
import { IProjectModel, Project } from '../model/project.model';

export var createProject = async function(project: IProject):Promise<IProjectModel> {
    LOGGER.info("creating projetc")
    LOGGER.debug("project:", project)
    const newProject = new Project(project);
    return newProject.save();
}

export var readProjects = async function(query: Object): Promise<IProjectModel[]> {
    LOGGER.info("fetching project");
    LOGGER.debug("query:", query);
    return Project.find(query).populate('assignments');
}

export var updateProject = async function(query:Object, projectDataToUpdate: IProject): Promise<IProjectModel> {
    LOGGER.info("updating projetc"); 
    LOGGER.debug(projectDataToUpdate);
    return Project.findOneAndUpdate(query, projectDataToUpdate);
}

export var deleteProject = async function(query: Object): Promise<IProjectModel> {
    LOGGER.info("deleting projetc");
    LOGGER.debug("query:", query);
    return Project.findOneAndDelete(query);
}