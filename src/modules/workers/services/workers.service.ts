import { Injectable } from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from '../dto/workers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Worker } from '../entities/workers.entity';
import { WorkerType } from '../entities/workerTypes.entity';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private repository: Repository<Worker>
  ){}

  async create(
    projectid: number,
    createWorkerDto: CreateWorkerDto,
    workerTypes: WorkerType[]) {

    let worker = new Worker();
    worker.name = createWorkerDto.name;
    worker.projectId = projectid;
    worker.types = Promise.resolve(workerTypes);
    await this.repository.save(worker);
    return worker.id;
  }


  async update(
    id: number,
    projectId: number,
    updateWorkerDto: UpdateWorkerDto,
    workerTypes: WorkerType[]) {

      console.log(`WorkersService : update()  Worker ${id} in project ${projectId} not implemented yet`);
      return -1
  }

  async delete(
    id: number,
    projectId: number) {

      console.log(`WorkersService : delete()  Worker ${id} from project ${projectId} not implemented yet`);
      return -1
  }

  // async createWorkerToTypes(workerid: number, workertypeid: number) {
  //   let workertotypes = new WorkerToTypes();
  //   workertotypes.workerid = workerid;
  //   workertotypes.typeid = workertypeid;
  //   await this.workersRepository.save(workertotypes);
  //   return workertotypes.id;
  // }

  // getAllByProject(projectid: number): Promise<Worker[]> {
  //   return this.workersRepository.find({
  //     where: {projectid: projectid}
  //   });
  // }

  // getWorkerById(id: number, 
  //               projectid:number): Promise<Worker> {
  //   if (id <= 0)
  //     throw Error("Worker id cannot be negative");
  //   return this.workersRepository.findOne({
  //     where: {id: id,
  //     projectid: projectid}
  //   });
  // }
  async getByProject(projectId: number): Promise<Worker[]> {
    console.log(`workerService : getByProject() for project ${projectId}`);
    return this.repository.find({
      where: {
        projectId: projectId
      }
    });
  }
  
  
  async getByIdAndProject(id: number, projectId: number): Promise<Worker> {
    console.log(`workerService : getByIdAndProject() with ID ${id} and project ${projectId}`);
    if (id <= 0)
      throw Error("Worker id cannot be negative");
    return this.repository.findOne({
      where: {
        id: id,
        projectId: projectId
      }
    });
  }
  
  async getByTypeAndProject(typeId: number, projectId: number): Promise<Worker[]> {
    console.log(`workerService : getByTypeAndProject() for type ${typeId} and project ${projectId}`);
  // SELECT * FROM Crop.tool JOIN Crop.tool_to_types ON worker.id = tool_to_types.toolid WHERE tool_to_types.typeid = '2';
  if (typeId <= 0)
    throw Error("Type id cannot be negative");
  
    // .getRepository(User)
    // .createQueryBuilder("user")
    // .leftJoinAndSelect("user.roles", "roles")
    // .leftJoinAndSelect("roles.establishment", "establishment")
    // .getMany();

    const [workersObjects] =  await this.repository.find() ;
  // const workersObjects =  this.repository.createQueryBuilder("worker") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
  //   .select('worker')
  //   //.innerJoin( 'workers_connect_types')
  //   .from(['worker','workers_connect_types' ])
  //   .where('worker.projectId = :projid', { projid: projectId })
  //   .andWhere('workers_connect_types.typeId = :typeid', { typeid: typeId })
  //   .andWhere('workers_connect_types.typeId = worker.typeId')
  //   .getMany();


  // const workersObjects = this.repository.find({
  //   relations:{
  //     types: true,
  //   },
  //   where: {
  //     projectId : projectId,
  //    }
  //   });

  return([workersObjects])

  //return 
  //});
  };


  // async getAllWorkersByTypeId(typeid: number): Promise<Worker[]> {
  //   // SELECT * FROM Crop.worker JOIN Crop.worker_to_types ON worker.id = worker_to_types.workerid WHERE worker_to_types.typeid = '2';
  //   // SELECT `worker`.`id` AS `worker_id`, `worker`.`name` AS `worker_name`, `worker`.`projectid` AS `worker_projectid`, `worker`.`typesid` AS `worker_typesid` FROM `worker` `worker` LEFT JOIN `worker_to_types` `wt` ON `worker`.`id` = `wt`.`workerid` WHERE `wt`.`typeid` = ? -- PARAMETERS: ["1"]
  //   if (typeid <= 0)
  //     throw Error("Type id cannot be negative");
  //   return await this.workersRepository.createQueryBuilder('worker')
  //       .select('worker')
  //       .leftJoin(WorkerToTypes, "wt", "worker.id = wt.workerid")
  //       .where('wt.typeid = :tid', { tid: typeid})
  //       .getMany();
  // }
}


// @Injectable()
// export class WorkerToTypesService {
//   constructor(
//     @InjectRepository(WorkerToTypes)
//     private workerToTypessRepository: Repository<WorkerToTypes>
//   ){}

//   async createWorkerToTypes(workerid: number, workertype: number) {
//     let workertotypes = new WorkerToTypes();
//     workertotypes.workerid = workerid;
//     workertotypes.typeid = workertype;
//     await this.workerToTypessRepository.save(workertotypes);
//     return workertotypes.id;
//   }
// }