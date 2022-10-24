import { Injectable , HttpException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepositoryCannotInheritRepositoryError, Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Project } from '../entities/projects.entity';
import { CreateProjectDTO, UpdateProjectDTO } from "../dto/projects.dto";
//import { CropStrain } from 'src/modules/Crop/entities/CropStrain.entity';
import { CropsConnectionService } from 'src/modules/crops/services/crops.connection.service';
import { CropStrain } from 'src/modules/crops/entities/cropStrain.entity';
import { GenericValidator } from 'src/modules/infrastructures/services/validators.base';
import { GenericEntityService } from 'src/modules/infrastructures/services/service.generic';
import { ProjectValidator } from './projects.validator';
//import { IProjectRepository } from "../data-access/project.repository";

type relationsType = "none"| "plots" | "cropStrains"| "all";

@Injectable()
export class ProjectsService extends GenericEntityService<Project, ProjectValidator>{

    // sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
    @InjectRepository(Project)
    protected projectRepository: Repository<Project>,
    @Inject(CropsConnectionService) private cropsConnectionService: CropsConnectionService){
      console.log("on ProjectService constructor")
      super(projectRepository);
      this.validator = new ProjectValidator(this)
    };
   
    private getRelationsRequest(relationsStr: relationsType): string[]{
      let relatios=[];
      switch (relationsStr){
        case "none": { break;}
        case "all":  { relatios=["plots","cropStrains"];   break;}
        default : { relatios=[relationsStr];   break;}
      }
      return relatios
    }
   
    async create(createProjectDto: CreateProjectDTO): Promise<Project|null> {
      console.log("project service : create() with project name " + createProjectDto.name );
      let projectEntity = new Project()
      //projectEntity.id=createProjectDto.id;
      projectEntity.name=createProjectDto.name;
      projectEntity.iconSrc=createProjectDto.iconSrc;
      
      let result = await this.projectRepository.save(projectEntity);
      return result;
    }; 

  async update(id: number, 
               updateProjectsDto: UpdateProjectDTO) : Promise<Project|null> {
      console.log(`project service : update()  project ID ${id} not implemented yes`);
      
      // first load the Crop strains 
      let cropStrianObjects : CropStrain[]=null;
      if (updateProjectsDto.CropStrainIds !== null){
        cropStrianObjects=await this.cropsConnectionService.getAllStrainsByStrainIds(updateProjectsDto.CropStrainIds)
      }

      //save project with relevant Crop strains
      let projectEntity = new Project()
      projectEntity.id = id;
      projectEntity.name=updateProjectsDto.name;
      projectEntity.iconSrc=updateProjectsDto.iconSrc;
      if (cropStrianObjects!==null) projectEntity.cropStrains=cropStrianObjects;
      //projectEntity = await this.projectRepository.preload(projectEntity)
      let result  = await this.projectRepository.save(projectEntity);
      return result;
    };

  async delete(id: number) {
      console.log(`project service : delete()  project ID ${id} not implemented yes`);
      return null;
    };
    
  async getHello(): Promise<string> {
      return 'Hello Project!';
  }
    
  async getAll(): Promise<Project[]> {
      console.log("project service : getAll()");
      return await this.projectRepository.find();
  }


getById(id: number,
        relationsStr: relationsType = "none"): Promise<Project|null>{
      console.log("project service : getById() with project ID " + id);
      if (id <= 0)
        throw Error("project service : getById() id cannot be negative");
      
      let relations=this.getRelationsRequest(relationsStr);
      let projectPromise = this.projectRepository.findOne({     
        where: {
          id: id,
        },
        relations: relations
      })/*.then((projectEntity)=>{
        if (projectEntity !== null){
          return this.projectRepository.preload(projectEntity)
        } else{
          return null
        }
      })*/
      return projectPromise
    };

  
}