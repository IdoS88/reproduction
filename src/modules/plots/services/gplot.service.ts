import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { gPlot } from '../entities/gplot.entity';
import {UpdateGPlotDTO, CreateGPlotDTO} from "../dto/gplot.dto";

@Injectable()
export class gPlotService {

    // sivan: better practice to costraint the type of conn. not know yet to which interface
    constructor(
        @InjectRepository(gPlot)
        private repository: Repository<gPlot>){
          console.log("on gPlotService constructor")
        };
    
    async getHello(): Promise<string> {
        return 'Hello gPlot!';
    }
    
  // async getAll(): Promise<gPlot[]> {
  //     console.log("gPlotService : getAll()");
  //     return this.repository.find();
  //   }


  async getByIdAndProject(
    id: number,
    projectId: number): Promise<gPlot> {
      console.log(`gPlotService : getById() with plot ID ${id} and project ${projectId}`);
      if (id <= 0)
        throw Error("gPlotService : getById() id cannot be negative");
      return this.repository.findOne({
        where: {
          id: id,
          projectId: projectId
        }
      });
    };

  async getByProject(projectid: number): Promise<gPlot[]> {
      console.log("gPlotService : getByProject() with project ID " + projectid);
      if (projectid <= 0)
        throw Error("gPlotService : getByProject() projectid should by positive integer");
      return this.repository.find({
        where: {  
          projectId: projectid }
      });
    };
  
  async create(
    projectId: number,
    createGPlotDto: CreateGPlotDTO) {
      console.log(`gPlotService : create gplot '${createGPlotDto.gplot_name}' in project ${projectId} `);
      let gplotEntity = new gPlot()
      gplotEntity.projectId=projectId;
      gplotEntity.gplot_name=createGPlotDto.gplot_name;
      
      await this.repository.save(gplotEntity);
      return gplotEntity.id;
    }; 

   async update(
    id: number,
    projectId: number,
    updateGPlotDto:UpdateGPlotDTO) {
      console.log(`gplot service : update gplot ${id} in project ${projectId} not implemented yet`);
      return -1;
    };

  async delete(id: number,
              projectId: number) {
      console.log(`gplot service : delete gplot ${id} in project ${projectId} not implemented yet`);
      return null;
    };
}