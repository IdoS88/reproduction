import { Injectable , HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Db, FindOptionsWhere, In, Repository } from 'typeorm';
//import { DATABASE_CONNECTION_TOKEN } from '../../commons/db.constants';
import { ProjectsService } from 'src/modules/projects/services/projects.service';
import { PlotValidator } from './plots.validator';
//import { PlotsConnection } from '../entities/plotsConnection.entity';
import { Plots } from '../entities/plots.entity';
import { PlotStrain } from '../entities/plotStrain.entity';
import { Project } from 'src/modules/projects/entities/projects.entity';
import { isMagnetURI } from 'class-validator';
import { PlotsService } from './plots.service';

@Injectable()
export class PlotConnectionService {
  //sivan: better practice to costraint the type of conn. not know yet to which interface
  constructor(
      // @InjectRepository(PlotsConnection)
      // protected repository: Repository<PlotsConnection>,
      //@Inject(ProjectsService) private readonly projectService: ProjectsService,
      private ds : DataSource){
      
        console.log("on PlotsConnection constructor")
  };
   

async updatePlotConnections(
  plotStrain: PlotStrain,
  plotsIds: number[]=null): Promise<PlotStrain> {

  var createdPlotStrain: PlotStrain=null;
  var userMessage : string="";
  let plotsObjects= await this.ds.manager
  .find(Plots, {
    where: {
      id: In (plotsIds),
      projectId: plotStrain.projectId
    }
  })
  plotStrain.plots = plotsObjects

  let actualPlotsIds = plotsObjects.map( (plot) => plot.id) 

  // 1) verify number of plots retreived = number of plotsIds : return warning message
  // 2) verify mainPlot is in actualPlotsIds array
  if (actualPlotsIds.length!=plotsIds.length){
    userMessage = `requested ${plotsIds} . can assign only ${actualPlotsIds}`
    console.log(userMessage)
  } 

  if(! actualPlotsIds.includes(plotStrain.mainPlotId)){
    userMessage = `mainPlot is not in assigned plots list ${actualPlotsIds}`
    console.log(userMessage)
  }
  //this function uses mysql transaction 
  // since I prefer to use mysql roleback mechanism, in case of failurs.
  // to protect the system of zombies records 

  const queryRunner = this.ds.createQueryRunner();
  // a new transaction:
  await queryRunner.startTransaction()
  
  try {
    // 1st action: save plotStrain
    createdPlotStrain=await queryRunner.manager.save(plotStrain)
  
    // finallty - commit whole transaction:
    await queryRunner.commitTransaction()
  } catch (err) {
      // if we have errors, rollback changes we made
      await queryRunner.rollbackTransaction()
      createdPlotStrain = null;
    } finally {
      // release query runner which is manually created:
      await queryRunner.release()
   }

   return createdPlotStrain;
}
}