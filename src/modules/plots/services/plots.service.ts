import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Plots } from '../entities/plots.entity';
import { CreatePlotDTO, UpdatePlotDTO } from "../dto/plots.dto";

@Injectable()
export class PlotsService {

  //sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
      @InjectRepository(Plots)
      private repository: Repository<Plots>){
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
    console.log("PlotService : getById() with ID ${id} and project ${projectId}");
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
      plotEntity.season=createPlotDto.seasonId;
      plotEntity.start_date=createPlotDto.startDate;
      plotEntity.end_date=createPlotDto.endDate;
      
      await this.repository.save(plotEntity);
      return plotEntity.id;
    }; 

  async update(
    id: number, 
    projectId: number,
    updatePlotDto: UpdatePlotDTO) {
      console.log('PlotService : update()  plot ${id} in project {$projectId} not implemented yet');
      return -1;
  };

  async delete(
    id: number,
    projectId: number): Promise<any> {
      console.log('PlotService : delete()  plot ${id} in project {$projectId} not implemented yet');
      return null;
  };
}