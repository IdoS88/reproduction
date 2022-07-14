import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from '../dto/create-worker.dto'; 
import { UpdateWorkerDto } from '../dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from '../entities/workers.entity';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>
  ){}

  async create(createWorkerDto: CreateWorkerDto) {
    let worker = new Worker();
    worker.name = createWorkerDto.name;
    worker.projectId = createWorkerDto.projectId;
    worker.typesId = createWorkerDto.typesId;
    await this.workersRepository.save(worker);
    return worker.id;
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

  // getAllWorkersByType(typeid: number): Promise<Worker[]> {
  //   if (typeid <= 0)
  //     throw Error("Type id cannot be negative");
  //   return this.workersRepository.find({
  //     where: {typesId: typeid,}
  //   });
  // }
}
