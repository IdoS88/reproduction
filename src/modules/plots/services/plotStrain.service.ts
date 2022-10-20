import { Injectable , HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { PlotStrain } from '../entities/plotStrain.entity';
import {UpdatePlotStrainDTO, CreatePlotStrainDTO} from "../dto/plotStrain.dto";
import { SpecificEntityService } from 'src/modules/infrastructures/services/service.specific';
import { PlotValidator } from './plots.validator';
import { ProjectsService } from 'src/modules/projects/services/projects.service';
import { PlotsService } from './plots.service';
import { Plots } from '../entities/plots.entity';
//import { PlotsConnection } from '../entities/plotsConnection.entity';
import { PlotConnectionService } from './plots.connection.service';

@Injectable()
export class PlotStrainService  extends SpecificEntityService<PlotStrain, PlotValidator> {

    // sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
    @InjectRepository(PlotStrain)
    protected repository: Repository<PlotStrain>,
    @Inject(PlotsService) private readonly plotsService: PlotsService,
    @Inject(PlotConnectionService) private readonly plotsConnectService: PlotConnectionService,
    @Inject(ProjectsService) private readonly projectService: ProjectsService){
      super(repository)
      this.validator = new PlotValidator(this);
      console.log("on PlotServiceService constructor")
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
    projectId: number): Promise<PlotStrain> {
      console.log(`plotStrainService : getById() with plot ID ${id} and project ${projectId}`);
      if (id <= 0)
        throw Error("plotStrainService : getById() id cannot be negative");
      return this.repository.findOne({
        where: {
          id: id,
          projectId : projectId
        },
        relations: ["plots", "season"]
      });
    };

  async getByProject(projectId: number): Promise<PlotStrain[]> {
      console.log(`plotStrainService : getByProject() with project ID ${projectId}`);
      // if (projectid <= 0)
      //   throw Error("plotStrainService : getByProject() projectid should by positive integer");
      return this.repository.find({
        where: {  
          projectId : projectId
        },
      });
    };
  
  async create(
    createPlotStrainDto: CreatePlotStrainDTO,
    projectId: number) : Promise<PlotStrain>{
      console.log(`PlotStrainService : create gplot '${createPlotStrainDto.name}' in project ${projectId} `);
      
      let projectObject = await this.projectService.getById(projectId)
      this.validator.checkEntity(projectObject)

      let plotStrainEntity = this.repository.create(createPlotStrainDto);
      plotStrainEntity.project = projectObject;
      //sivan: should validate cropstrain allowed by project

      plotStrainEntity = await this.plotsConnectService.updatePlotConnections(
        plotStrainEntity, 
        createPlotStrainDto.plotsIds)


      
      // if (this.validator.checkProjectLink(projectObject, createPlotStrainDto.cropStrainId)){
      //   //save plot with relevant Crop strains
      //   plotStrainEntity.cropStrainId=createPlotStrainDto.cropStrainId;
        
  
      //   //projectEntity = await this.projectRepository.preload(projectEntity)
      //   console.log(`PlotStrainService service : going to create plotStrain for project ${projectId} with Croptrain ${createPlotStrainDto.cropStrainId}`);
      // }
   //   return await this.repository.save(plotStrainEntity);
     return plotStrainEntity;
    }; 

   async update(
    id: number,
    updatePlotStrainDto:UpdatePlotStrainDTO,
    projectId: number): Promise<PlotStrain> {
      console.log(`PlotStrainService : update plotStrain ${id} in project ${projectId} not implemented yet`);
     
      let projectObject = await this.projectService.getById(projectId)
      this.validator.checkEntity(projectObject)

      let plotStrainEntity = await this.repository.create(updatePlotStrainDto)
      plotStrainEntity.id = id
      plotStrainEntity = await this.repository.preload(plotStrainEntity)
      
      //sivan: should validate cropstrain allowed by project

      plotStrainEntity = await this.plotsConnectService.updatePlotConnections(
        plotStrainEntity, 
        updatePlotStrainDto.plotsIds)

      // if (!successflag ){
      //   plotStrainEntity = await this.repository.preload({id: id})
      // }
      return  plotStrainEntity;
    };

  async delete(id: number,
              projectId: number) {
      console.log(`PlotStrainService : delete gplot ${id} in project ${projectId} not implemented yet`);
      return null;
    };
}