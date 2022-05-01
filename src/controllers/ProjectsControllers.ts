import ProjectService from "../services/ProjectService";


export default class ProjectController {
    projectService : ProjectService;

    constructor(projectService : ProjectService) {
        this.projectService = projectService;    
    }

    async GetAllProjects() {
        return await this.projectService.getAllProjects();
    }

    async GetProjectById(projectid : number) {
        return await this.projectService.getProjectById(projectid);
    }
}