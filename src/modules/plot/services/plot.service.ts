import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Plot } from '../entities/plot.entity';
import { CreatePlotDTO, UpdatePlotDTO } from "../dto/plot.dto";

@Injectable()
export class PlotService {

  //sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
      @InjectRepository(Plot)
      private repository: Repository<Plot>){
        console.log("on PlotService constructor")
  };
    
  async getHello(): Promise<string> {
    return 'Hello Plot!';
  }
    
  getAll(): Promise<Plot[]> {
      console.log("PlotService : getAll()");
      return this.repository.find();
  }


  async getById(id: number): Promise<Plot> {
    console.log("PlotService : getById() with ID " + id);
    if (id <= 0)
        throw Error("PlotService : getById() id cannot be negative");

      return this.repository.findOne({
        where: {
          id: id,
        }
    })
  };
  
  async create(createPlotDto: CreatePlotDTO) {
      console.log("PlotService : create() for project  " + createPlotDto.projectId);
      let plotEntity = new Plot()
      plotEntity.project=createPlotDto.projectId;
      plotEntity.season=createPlotDto.seasonId;
      plotEntity.startDate=createPlotDto.startDate.toDateString();
      plotEntity.endDate=createPlotDto.endDate.toDateString();
      
      await this.repository.save(plotEntity);
      return plotEntity.id;
    }; 

  async update(updatePlotDto: UpdatePlotDTO) {
      console.log("PlotService : update()  ID " + updatePlotDto.id + " not implemented yes");
      return -1;
  };

  async delete(id: number) {
      console.log("PlotService : delete()  plot " + id + " not implemented yes");
      return null;
  };
}