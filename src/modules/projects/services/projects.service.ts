import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Projects } from '../entities/projects.entity';
import { CreateProjectDTO, UpdateProjectDTO } from "../dto/projects.dto";
//import { IProjectRepository } from "../data-access/project.repository";

@Injectable()
export class ProjectsService {

    // sivan: better practice to costraint the type of conn. not know yet to which interface
    constructor(
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>){
          console.log("on ProjectService constructor")
        };
    
    async getHello(): Promise<string> {
        return 'Hello Project!';
    }
    
  getAll(): Promise<Projects[]> {
      console.log("project service : getAll()");
      return this.projectRepository.find();
    }


  async getById(id: number): Promise<Projects> {
      console.log("project service : getById() with project ID " + id);
      if (id <= 0)
        throw Error("project service : getById() id cannot be negative");

      return this.projectRepository.findOne({
        where: {
          id: id,
        }
      })
    };

  async create(createProjectDto: CreateProjectDTO) {
      console.log("project service : create() with project name " + createProjectDto.name );
      let projectEntity = new Projects()
      //projectEntity.id=createProjectDto.id;
      projectEntity.name=createProjectDto.name;
      projectEntity.iconSrc=createProjectDto.iconSrc;
      
      await this.projectRepository.save(projectEntity);
      return projectEntity.id;
    }; 

  async update(updateProjectsDto: UpdateProjectDTO) {
      console.log("project service : update()  project ID " + updateProjectsDto.id + " not implemented yes");
      return -1;
    };

  async delete(id: number) {
      console.log("project service : delete()  project ID " + id + " not implemented yes");
      return null;
    };
}