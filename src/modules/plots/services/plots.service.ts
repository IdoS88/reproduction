import { Injectable , HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Plots } from '../entities/plots.entity';
import { CreatePlotDTO, UpdatePlotDTO } from "../dto/plots.dto";
import { ProjectsService } from 'src/modules/projects/services/projects.service';
import { Project } from 'src/modules/projects/entities/projects.entity';
import {err_illegalMissingProject, err_EntityNotFound} from 'src/modules/commons/errors';
//import { CropStrain } from 'src/modules/Crop/entities/CropStrain.entity';
//import { GenericEntitryService } from 'src/modules/infrastructures/services/service.generic';
import { SpecificEntityService } from 'src/modules/infrastructures/services/service.specific';
import { PlotValidator } from './plots.validator';

type relationsType = "none"| "Croptrain"| "project"| "all";

@Injectable()
export class PlotsService extends SpecificEntityService<Plots, PlotValidator>{

  //sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
      @InjectRepository(Plots)
      protected repository: Repository<Plots>,
      @Inject(ProjectsService) private readonly projectService: ProjectsService){
        super(repository);
        this.validator = new PlotValidator(this);

        console.log("on PlotService constructor")
  };
   
  private getRelationsRequest(relationsStr: relationsType): string[]{
    let relatios=[];
    switch (relationsStr){
      case "none": { break;}
      case "all":  { relatios=["project","Croptrain"];   break;}
      default : { relatios=[relationsStr];   break;}
    }
    return relatios
  }

  async create(createDTO: CreatePlotDTO,
               projectId: number,): Promise<Plots|null> {
    console.log("PlotService : create new plot in  " + projectId);
      
    let result = null;
    let plotEntity = null;

    let projectObject = await this.projectService.getById(projectId)
    if (this.validator.checkProjectLink(projectObject, createDTO.crop_strainId)){
      plotEntity = new Plots()
      plotEntity.projectId=projectId;
      plotEntity.seasonId=createDTO.seasonId;
      plotEntity.start_date=createDTO.startDate;
      plotEntity.end_date=createDTO.endDate;
      if (createDTO.crop_strainId !== undefined){
        plotEntity.crop_strainId=createDTO.crop_strainId;
      }
      
      plotEntity=await this.repository.save(plotEntity);
    }
    return plotEntity;
  }; 

  async update(
    id: number, 
    updateDTO: UpdatePlotDTO,
    projectId: number) {
      
    let result = null;
    
    console.log(`PlotService : update()  plot ${id} in project ${projectId}`);
    let plotEntity = await this.getByIdAndProject(id, projectId)
    this.validator.checkEntity(plotEntity)
    let projectObject = await this.projectService.getById(projectId, "all")

    if (this.validator.checkProjectLink(projectObject, updateDTO.crop_strainId)){
      //save plot with relevant Crop strains
      plotEntity.crop_strainId=updateDTO.crop_strainId;
      plotEntity.seasonId=updateDTO.seasonId;
      plotEntity.start_date=updateDTO.startDate;
      plotEntity.end_date=updateDTO.endDate;

      //projectEntity = await this.projectRepository.preload(projectEntity)
      console.log(`PlotService service : going to update plot ${id}  project ${projectId} with Croptrain ${updateDTO.crop_strainId}`);
      result  = await this.repository.save(plotEntity);
    }
    return result;
  };

  async delete(
    id: number,
    projectId: number): Promise<any> {
      console.log(`PlotService : delete()  plot ${id} in project ${projectId} not implemented yet`);
      return null;
  };
  async getHello(): Promise<string> {
    return 'Hello Plot!';
  }
    
  // sivan: shis method should by in specific service
  async getByIdAndProject(
    id: number, 
    projectId: number,
    relationsStr: relationsType = "none"): Promise<Plots> {
    console.log(`PlotService : getById() with ID ${id} and project ${projectId}`);
    if (id <= 0)
        throw Error("PlotService : getById() id cannot be negative");

    let relations=this.getRelationsRequest(relationsStr);
    return this.repository.findOne({
        where: {
          id: id,
          projectId: projectId
        },
        relations: relations
    })
  };



// sivan: shis method should by in specific service
async getByProject(projectid: number): Promise<Plots[]> {
    console.log("PlotService : getByProject() for project " + projectid);
    if (projectid <= 0)
        throw Error("PlotService : getByProject() id cannot be negative");

    return this.repository.find({
        where: {
          projectId: projectid,
        }
    })
  };

// sivan: this functionality should be in validator  - but independed on linked Entity type
// validateProjectLink(
//   projectObject: Project, 
//   crop_strainId?: number): boolean{
  
//   let result = true; // its is ok  if crop_strainId is missing
//   if (crop_strainId!==undefined){
//     let Croptrain_in_project= projectObject.CropStrainArr.find(
//       function(x){  return (x.id === crop_strainId)});  

//       if (Croptrain_in_project===null)  {
//         throw new err_EntityNotFound (`PlotService service :  project ${projectObject.id} not allows Croptrain ${crop_strainId}`);
//       }
//       result=true;
//   }
//   return result;
// }

// async validateEntityWithProject(
//   id :  number,
//   projectId: number): Promise<Plots | null>{

//     let plotObj = await this.getByIdAndProject(id, projectId)
//     if (plotObj===null){
//       //sivan: should through exception
//       throw new err_EntityNotFound(`PlotService service :  plot ${plotObj.id} dosn't have project ${projectId}`);
//     }
//     return plotObj
//   }
    
  
  
}