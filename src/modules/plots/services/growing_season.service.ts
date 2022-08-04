import { Injectable , HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { GrowingSeason } from '../entities/growing_season.entity';
import { CreateGrowingSeasonDTO , UpdateGrowingSeasonDTO} from "../dto/growing_season.dto";

@Injectable()
export class GrowingSeasonService {

    // sivan: better practice to costraint the type of conn. not know yet to which interface
    constructor(
        @InjectRepository(GrowingSeason)
        private repository: Repository<GrowingSeason>){
          console.log("on GrowingSeasonService constructor")
    };
    
    async getHello(): Promise<string> {
        return 'Hello GrowingSeason!';
    }
    
  getAll(): Promise<GrowingSeason[]> {
      console.log("GrowingSeasonService : getAll()");
      return this.repository.find();
    }


  async getByIdAndProject(
    id: number,
    projectid: number): Promise<GrowingSeason> {
      console.log("GrowingSeasonService : getByIdAndProject(${id}) for ptoject ${projectid} " );
      if (id <= 0)
        throw Error("GrowingSeasonService : getByIdAndProject() id cannot be negative");

      return this.repository.findOne({
        where: {
          id: id,
          projectId: projectid
        }
      })
  };

  async getByProject(projectid: number): Promise<GrowingSeason[]> {
    console.log("GrowingSeasonService : getByProjectId() with project " + projectid);
    if (projectid <= 0)
      throw Error("GrowingSeasonService : getByProjectId() id cannot be negative");

    return this.repository.find({
      where: {
        projectId: projectid,
      }
    })
  };

  async create(createGrowingSeasonDto: CreateGrowingSeasonDTO) {
      console.log("GrowingSeasonService : create() for season name " + createGrowingSeasonDto.name);
      let growingSeasonEntity = new GrowingSeason()
      growingSeasonEntity.name=createGrowingSeasonDto.name;
      growingSeasonEntity.projectId=createGrowingSeasonDto.projectId;
      growingSeasonEntity.start_date=createGrowingSeasonDto.startDate;
      growingSeasonEntity.end_date=createGrowingSeasonDto.endDate;
      
      await this.repository.save(growingSeasonEntity);
      return growingSeasonEntity.id;
    }; 

  async update(id: number,
               updateGrowingSeasonDto: UpdateGrowingSeasonDTO) {
      console.log("GrowingSeasonService: update()  ID " + id + " not implemented yes");
      return -1;
    };

  async delete(id: number) {
      console.log("GrowingSeasonService : delete()   ID " + id + " not implemented yes");
      return null;
    };
}