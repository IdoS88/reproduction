import { IProjectRepository } from "../data-access/ProjectRepository";
import ProjectModel from "../entities/project";

export default class ProjectService {
    projectRepo : IProjectRepository;

    constructor(projectRepo : IProjectRepository) {
        this.projectRepo = projectRepo;
    }
    async getAllPeojects() {
        return this.projectRepo.getAll();
    }
}