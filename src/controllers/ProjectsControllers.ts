import ProjectService from "../services/ProjectService";


export default class ProjectController {
    projectService : ProjectService;

    constructor(projectService : ProjectService) {
        this.projectService = projectService;    
    }

    async GetAllProjects() {
        return await this.projectService.getAllPeojects();
    }
}