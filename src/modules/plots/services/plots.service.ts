import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Plots } from '../entities/plots.entity';
import { CreatePlotDTO, UpdatePlotDTO } from "../dto/plots.dto";
import { ProjectsService } from 'src/modules/projects/services/projects.service';
//import { Project } from 'src/modules/projects/entities/projects.entity';
import {err_illegalMissingProject, err_EntityNotFound} from 'src/modules/commons/errors';

@Injectable()
export class PlotsService {

  //sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
      @InjectRepository(Plots)
      private repository: Repository<Plots>,
      private readonly projectService: ProjectsService){
        console.log("on PlotService constructor")
  };
    
  async getHello(): Promise<string> {
    return 'Hello Plot!';
  }
    
  // getAll(): Promise<Plots[]> {
  //     console.log("PlotService : getAll()");
  //     return this.repository.find();
  // }


  async getByIdAndProject(id: number, projectId: number): Promise<Plots> {
    console.log(`PlotService : getById() with ID ${id} and project ${projectId}`);
    if (id <= 0)
        throw Error("PlotService : getById() id cannot be negative");

      return this.repository.findOne({
        where: {
          id: id,
          projectId: projectId
        }
    })
  };
  
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
  // async getByConstraints(projectid: number): Promise<gPlot[]> {
  //   console.log("gPlotService : getByProject() with project ID " + projectid);
  //   if (projectid <= 0)
  //     throw Error("gPlotService : getByProject() projectid should by positive integer");
  //   return this.repository.find({
  //     where: {  
  //       projectId: projectid }
  //   });
  // };

  async create(projectId: number,
              createPlotDto: CreatePlotDTO): Promise<number> {
      console.log("PlotService : create new plot in  " + projectId);
      let plotEntity = new Plots()
      plotEntity.projectId=projectId;
      plotEntity.seasonId=createPlotDto.seasonId;
      plotEntity.start_date=createPlotDto.startDate;
      plotEntity.end_date=createPlotDto.endDate;
      
      await this.repository.save(plotEntity);
      return plotEntity.id;
    }; 

  async update(
    id: number, 
    projectId: number,
    updatePlotDto: UpdatePlotDTO) {
      
    let result = null;
    
    console.log(`PlotService : update()  plot ${id} in project ${projectId}`);
    let plotObj = await this.getByIdAndProject(id, projectId)
    
    if (plotObj===null){
      //sivan: should through exception
      throw new err_EntityNotFound(`PlotService service : update plot ${id} but missing project ${projectId}`);
    }
    
    let projectObject = await this.projectService.getById(projectId)
    let cropStrain_in_project = projectObject.cropsStrainArr.find(
        function(x){  return (x.id === updatePlotDto.crop_strainId)});  
    
    if (cropStrain_in_project===null)  {
      throw Error (`PlotService service : update plot ${id} but project ${projectId} not allows cropstrain ${updatePlotDto.crop_strainId}`);
    }

    //save plot with relevant crops strains
    let plotEntity = new Plots()
    plotEntity.id=id;
    plotEntity.projectId=projectId;
    plotEntity.crop_strainId=updatePlotDto.crop_strainId;
    plotEntity.seasonId=updatePlotDto.seasonId;
    plotEntity.start_date=updatePlotDto.startDate;
    plotEntity.end_date=updatePlotDto.endDate;

    //projectEntity = await this.projectRepository.preload(projectEntity)
    console.log(`PlotService service : going to update plot ${id}  project ${projectId} with cropstrain ${updatePlotDto.crop_strainId}`);
    result  = await this.repository.save(plotEntity);
    return result;
  };

  async delete(
    id: number,
    projectId: number): Promise<any> {
      console.log(`PlotService : delete()  plot ${id} in project ${projectId} not implemented yet`);
      return null;
  };
}