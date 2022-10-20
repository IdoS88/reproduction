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

type relationsType = "none"| "plots"|"plotStrains"| "all";
// type selectStructurs={
//   plots: boolean,
//   plotStrain: boolean
// }
// type whereStructure = {
//   projectId?: number
//   plotId?:number,
//   plotStrain?: number
// }

type  PlotConnectionStructure= {
  plotStrains : PlotStrain,
  plotId : number
};

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
   
  // private getRelationsRequest(relationsStr: relationsType): string[]{
  //   let relatios=[];
  //   switch (relationsStr){
  //     case "none": { break;}
  //     case "all":  { relatios=["project","plotStrain", "plot"];   break;}
  //     default : { relatios=[relationsStr];   break;}
  //   }
  //   return relatios
  // }


// private async getPlotByIdAndProject(
//   id: number, 
//   projectId: number):Promise<Plots>{
//     return null

// }


// private async assignPlotConnections(
//   plotStrain: PlotStrain,
//   plotsIds: number[]=null): Promise<PlotsConnection[]>{
//      // for each plotIds : check if already has connection, if not - generate one  
//   let plotsInConnections =  Promise.all(plotsIds.map(
//     async (plotId) => {
//       var  plotConnStruct= {
//         plotStrains : plotStrain,
//         plotId : plotId
//       }
//       //1. check if plotsConnection entity exists 
//       let plotConnection = await this.ds.manager
//             .createQueryBuilder(PlotStrain, "plotStrain")
//             .leftJoin("cropStrain.projects", "project")
//             .where("project.id = :id", { id: projectId })
//             .getMany()
//       // sivan : TODO should validate both plot and plotStrain have same projectId
      
//       if (plotConnection==null){
//         // 2. if does not have such connection - create them
//         //    assuming plots exists, projecId is match to plot's projectId
//         plotConnection = this.repository.create(plotConnStruct)
//       }
//       return plotConnection;
//     }
//   ))
//   return plotsInConnections
// }

// async loadAssignPlots(projectId: number,
//                       plotsIds: number[]=null): Promise<Plots[]>{
//   var plotsObjects : Plots[] = null
//   if (plotsIds!=null){
//     plotsObjects = await this.ds.manager
//     .createQueryBuilder()
//     .select()
//     .from(Plots, "plot")
//     .leftJoin(Project, "project")
//     .where(`plot.id in [${plotsIds}]`)
//     .andWhere(`plot.projectId = ${projectId}`)
//     .getMany()
//   }
//   return plotsObjects
// }


async updatePlotConnections(
  plotStrain: PlotStrain,
  plotsIds: number[]=null): Promise<PlotStrain> {

  var createdPlotStrain: PlotStrain=null;
  let plotsObjects= await this.ds.manager
  .find(Plots, {
    where: {
      id: In (plotsIds),
      projectId: plotStrain.projectId
    }
  })
  plotStrain.plots = plotsObjects

  // sivan: todo - verify number of plots retreived = number of plotsIds
  if (plotsObjects.length<plotsIds.length){
    // verify assign only  plots with same project as  plotstrain 
    plotsIds = plotsObjects.map( (plot) => plot.id) 
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



// async updatePlotConnections(
//   plotStrain: PlotStrain,
//   plotsIds: number[]=null): Promise<PlotStrain[]> {

  
//   //this function uses mysql transaction 
//   // since I prefer to use mysql roleback mechanism, in case of failurs.
//   // to protect the system of zombies records 

//   //1) first, build plotConnection entities 
//   let assignPlotConnections = await this.assignPlotConnections(plotStrain, plotsIds)
   
//   //2) than - use transaction to add relevant plotConnection
//   const queryRunner = this.ds.createQueryRunner();
//   // a new transaction:
//   await queryRunner.startTransaction()

//   try {
//     // 1st action: save plotStrain
//     let createdPlotStrain=await queryRunner.manager.save(plotStrain)
    
//     //assign to new plotStrain Id into plotConnetions records
//     assignPlotConnections.forEach(element => {
//       element.plotStrainId = createdPlotStrain.id
//     });
     
//     // 2nd action: save assignPlotConnections
//     await queryRunner.manager.save(assignPlotConnections);
    
//     // finallty - commit whole transaction:
//     await queryRunner.commitTransaction()
//   } catch (err) {
//       // if we have errors, rollback changes we made
//       await queryRunner.rollbackTransaction()
//     } finally {
//       // release query runner which is manually created:
//       await queryRunner.release()
//    }

//    return assignPlotConnections;
// }
  

// async updatePlot( 
//   newPlot: Plots): Promise<Plots>{
//  // let dsManager=this.ds.manager
//   //  using a QueryRunner:
//   const queryRunner = this.ds.createQueryRunner();
//   var createdPlot: Plots=null;
//   var plot_project_connect : PlotsConnection= null;
//   // a new transaction:
//   await queryRunner.startTransaction()

//   try {
//     // execute some operations on this transaction:
//     createdPlot=await queryRunner.manager.save(newPlot)
//     let plot_project_connect:new PlotsConnection()
//     let plot_project_connect = await queryRunner.manager.save(plot_project_connect);
//     // commit transaction:
//     await queryRunner.commitTransaction()
//   } catch (err) {
//     // if we have errors, rollback changes we made
//     await queryRunner.rollbackTransaction()
//   } finally {
//     // release query runner which is manually created:
//     await queryRunner.release()
//   }
//   return createdPlot
// }
// async getByProject(projectid: number): Promise<PlotsConnection[]> {
//     console.log("PlotConnectionService : getByProject() for project " + projectid);
//     if (projectid <= 0)
//         throw Error("PlotService : getByProject() id cannot be negative");
//     let relations = this.getRelationsRequest("all")
//     return this.repository.find({
//         where: {
//           projectId: projectid,
//         },
//         relations: relations
//     })
//   };

 
  // async getPlotConnectionByConstraints(constrains: FindOptionsWhere<PlotsConnection>): Promise<PlotsConnection[]> {
  //   console.log("PlotConnectionService : getPlotsByConstraints() for " + constrains);
  
  //   let relations = this.getRelationsRequest("all")

  //   Object.keys(constrains).forEach((k) => constrains[k] == null && delete constrains[k]);
   
  //   const whereConstrains : FindOptionsWhere<PlotsConnection> = constrains
  //   return await this.repository.find({
  //       where: whereConstrains,
  //       relations: relations
  //   })
  // };
  
}