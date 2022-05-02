import { IProjectRepository } from "../data-access/ProjectRepository";
import ProjectModel from "../entities/project";

export default class ProjectService {
    projectRepo : IProjectRepository;

    constructor(projectRepo : IProjectRepository) {
        this.projectRepo = projectRepo;
    }
    async getAllProjects() {
        return this.projectRepo.getAll();
    }

    async getProjectById(projectid : number) {
        if (projectid <= 0)
            throw Error("Project id cannt be negative");
        return this.projectRepo.getById(projectid);
    }
}