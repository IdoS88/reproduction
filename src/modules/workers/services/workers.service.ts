import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from '../dto/workers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker, WorkerToTypes } from '../entities/workers.entity';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>
  ){}

  async create(createWorkerDto: CreateWorkerDto) {
    let worker = new Worker();
    worker.name = createWorkerDto.name;
    worker.projectid = createWorkerDto.projectid;
    worker.typesid = createWorkerDto.typesid;
    await this.workersRepository.save(worker);
    
    let typesarray = createWorkerDto.typesid.toString().split(",")
    typesarray.forEach(typeid => {
      this.createWorkerToTypes(worker.id, parseInt(typeid));
    });
    return worker.id;
  }

  async createWorkerToTypes(workerid: number, workertypeid: number) {
    let workertotypes = new WorkerToTypes();
    workertotypes.workerid = workerid;
    workertotypes.typeid = workertypeid;
    await this.workersRepository.save(workertotypes);
    return workertotypes.id;
  }

  getAll(): Promise<Worker[]> {
    return this.workersRepository.find();
  }

  getWorkerById(id: number): Promise<Worker> {
    if (id <= 0)
      throw Error("Worker id cannot be negative");
    return this.workersRepository.findOne({
      where: {id: id,}
    });
  }

  async getAllWorkersByTypeId(typeid: number): Promise<Worker[]> {
    // SELECT * FROM crops.worker JOIN crops.worker_to_types ON worker.id = worker_to_types.workerid WHERE worker_to_types.typeid = '2';
    // SELECT `worker`.`id` AS `worker_id`, `worker`.`name` AS `worker_name`, `worker`.`projectid` AS `worker_projectid`, `worker`.`typesid` AS `worker_typesid` FROM `worker` `worker` LEFT JOIN `worker_to_types` `wt` ON `worker`.`id` = `wt`.`workerid` WHERE `wt`.`typeid` = ? -- PARAMETERS: ["1"]
    if (typeid <= 0)
      throw Error("Type id cannot be negative");
    return await this.workersRepository.createQueryBuilder('worker')
        .select('worker')
        .leftJoin(WorkerToTypes, "wt", "worker.id = wt.workerid")
        .where('wt.typeid = :tid', { tid: typeid})
        .getMany();
  }
}


@Injectable()
export class WorkerToTypesService {
  constructor(
    @InjectRepository(WorkerToTypes)
    private workerToTypessRepository: Repository<WorkerToTypes>
  ){}

  async createWorkerToTypes(workerid: number, workertype: number) {
    let workertotypes = new WorkerToTypes();
    workertotypes.workerid = workerid;
    workertotypes.typeid = workertype;
    await this.workerToTypessRepository.save(workertotypes);
    return workertotypes.id;
  }
}