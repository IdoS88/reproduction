import { Injectable , HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { Season } from '../entities/season.entity';
import { CreateSeasonDTO , UpdateSeasonDTO} from "../dto/season.dto";
import { SpecificEntity } from 'src/modules/infrastructures/entities/abstract.entity';
import { SpecificEntityService } from 'src/modules/infrastructures/services/service.specific';
import { PlotValidator } from './plots.validator';
import { ProjectsService } from 'src/modules/projects/services/projects.service';

@Injectable()
export class SeasonService extends SpecificEntityService<Season, PlotValidator> {

    // sivan: better practice to costraint the type of conn. not know yet to which interface
    constructor(
        @InjectRepository(Season)
        protected repository: Repository<Season>,
        @Inject(ProjectsService) private readonly projectService: ProjectsService){
          console.log("on GrowingSeasonService constructor")
          super(repository)
          this.validator = new PlotValidator(this);
    };
    
  async getHello(): Promise<string> {
      return 'Hello Season!';
  }
    
  // getAll(): Promise<GrowingSeason[]> {
  //     console.log("GrowingSeasonService : getAll()");
  //     return this.repository.find();
  //   }


  async getByIdAndProject(
    id: number,
    projectid: number): Promise<Season> {
      console.log(`SeasonService : getByIdAndProject(${id}) for ptoject ${projectid}` );
     
      return this.repository.findOne({
        relations:["plotStrains"],
        where: {
          id: id,
          projectId: projectid
        }
      })
  };

  
async getByProject(projectId: number): Promise<Season[]> {
    console.log("SeasonService : getByProjectId() with project " + projectId);
    
    return this.repository.find({
      where: {
        projectId: projectId,
    }
  })
};

  async create(createSeasonDto: CreateSeasonDTO,
               projectId: number) : Promise<Season>{
      console.log(`GrowingSeasonService : create() for season name ${createSeasonDto.name} for project ${projectId}`);
     
      let projectObject = await this.projectService.getById(projectId)
      this.validator.checkEntity(projectObject)

      let seasonEntity = this.repository.create(createSeasonDto)
      seasonEntity.project
//     // growingSeasonEntity.projectId=projectid;
      // growingSeasonEntity.start_date=createSeasonDto.startDate;
      // growingSeasonEntity.end_date=createSeasonDto.endDate;
      
      return await this.repository.save(seasonEntity);
    }; 

  async update(id: number,
               updateSeasonDto: UpdateSeasonDTO,
               projectid: number): Promise<Season> {
      console.log(`SeasonService: update()  ID ${id} for project ${projectid} not implemented yes`);
      return null;
    };

  async delete(id: number,
               projectid: number) {
      console.log(`GrowingSeasonService : delete() ID ${id} for project ${projectid} not implemented yes`);
      return null;
    };
}