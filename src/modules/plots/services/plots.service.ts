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
import { PlotConnectionService } from './plots.connection.service';

type relationsType = "none"| "Croptrain"| "project"| "all";

@Injectable()
export class PlotsService extends SpecificEntityService<Plots, PlotValidator>{

  //sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
      @InjectRepository(Plots)
      protected repository: Repository<Plots>,
      @Inject(ProjectsService) private readonly projectService: ProjectsService,
      @Inject(PlotConnectionService) private readonly plotConnectionService: PlotConnectionService ){
        super(repository);
        this.validator = new PlotValidator(this);

        console.log("on PlotService constructor")
  };
   
  private getRelationsRequest(relationsStr: relationsType): string[]{
    let relatios=[];
    switch (relationsStr){
      case "none": { break;}
      case "all":  { relatios=["project","CropStrain"];   break;}
      default : { relatios=[relationsStr];   break;}
    }
    return relatios
  }

  async create(createDTO: CreatePlotDTO,
               projectId: number): Promise<Plots|null> {
    console.log("PlotService : create new plot in  " + projectId);
      
    let result = null;
    let plotEntity = null;

    let projectObject = await this.projectService.getById(projectId)
    this.validator.checkEntity(projectObject)
    
    plotEntity = this.repository.create(createDTO)
    plotEntity.project = projectObject;
      
    plotEntity=await this.repository.save(plotEntity);

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
    //let projectObject = await this.projectService.getById(projectId, "all")

   // if (this.validator.checkProjectLink(projectObject, updateDTO.crop_strainId)){
      //save plot with relevant Crop strains
    plotEntity.name=updateDTO.name;
    plotEntity.number=updateDTO.number;
    plotEntity.remarks=updateDTO.remarks;
    plotEntity.area=updateDTO.area;

    //projectEntity = await this.projectRepository.preload(projectEntity)
     console.log(`PlotService service : going to update plot ${id}  project ${projectId} `);
      
    //}
    result  = await this.repository.save(plotEntity);
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
    console.log(`PlotService : getByIdAndProject() with ID ${id} and project ${projectId}`);
    
    var result : Plots=null
    // let connectionObj = await this.plotConnectionService.getPlotsByConstraints(
    //   {projectId: projectId,
    //   plotId: id});
    // if (connectionObj.length==1){
    //   result = connectionObj[0].plots
    // } 
    // return result;


    let relations=this.getRelationsRequest(relationsStr);
    return this.repository.findOne({
         relations: relations,
          where: {
            id: id,
            projectId: projectId
           }
         })
  };



  // // sivan: shis method should by in specific service
  async getByProject(projectId: number): Promise<Plots[]> {
    console.log("PlotService : getByProject() for project " + projectId);
      
    var result : Plots[]=null
    // let connectionObjs = await this.plotConnectionService.getPlotsByConstraints(
    //   {projectId: projectId});
    //   if (connectionObjs.length>0){
    //     result = connectionObjs.map((obj, index)=>{return obj.plots;})
    //   } 
    //   return result;    
    
    return this.repository.find({
      where: {
        projectId: projectId
      }
    })
  };  
  
}