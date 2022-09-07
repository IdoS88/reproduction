import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepositoryCannotInheritRepositoryError, Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Project } from '../entities/projects.entity';
import { CreateProjectDTO, UpdateProjectDTO } from "../dto/projects.dto";
//import { CropsStrain } from 'src/modules/crops/entities/cropsStrain.entity';
import { CropsStrainService } from 'src/modules/crops/services/cropsStrain.service';
import { CropsStrain } from 'src/modules/crops/entities/cropsStrain.entity';
//import { IProjectRepository } from "../data-access/project.repository";

@Injectable()
export class ProjectsService {

    // sivan: better practice to costraint the type of conn. not know yet to which interface
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private cropsStrainService: CropsStrainService){
          console.log("on ProjectService constructor")
        };
    
    async getHello(): Promise<string> {
        return 'Hello Project!';
    }
    
  getAll(): Promise<Project[]> {
      console.log("project service : getAll()");
      return this.projectRepository.find();
    }


  async getById(id: number): Promise<Project> {
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
      let projectEntity = new Project()
      //projectEntity.id=createProjectDto.id;
      projectEntity.name=createProjectDto.name;
      projectEntity.iconSrc=createProjectDto.iconSrc;
      
      await this.projectRepository.save(projectEntity);
      return projectEntity.id;
    }; 

  async update(id: number, 
               updateProjectsDto: UpdateProjectDTO) {
      console.log(`project service : update()  project ID ${id} not implemented yes`);
      
      // first load the crops strains 
      let cropStrianObjects : CropsStrain[]=null;
      if (updateProjectsDto.cropsStrainIds !== null){
        cropStrianObjects=await this.cropsStrainService.getCropsStrainByStrainIds(updateProjectsDto.cropsStrainIds)
      }

      //save project with relevant crops strains
      let projectEntity = new Project()
      projectEntity.id = id;
      projectEntity.name=updateProjectsDto.name;
      projectEntity.iconSrc=updateProjectsDto.iconSrc;
      if (cropStrianObjects!==null) projectEntity.cropsStrainArr=cropStrianObjects;
      //projectEntity = await this.projectRepository.preload(projectEntity)
      let result  = await this.projectRepository.save(projectEntity);
      return result;
    };

  async delete(id: number) {
      console.log(`project service : delete()  project ID ${id} not implemented yes`);
      return null;
    };
}