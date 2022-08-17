import { Injectable } from '@nestjs/common';
import { CreateWorkerTypeDto, UpdateWorkerTypeDto } from '../dto/worker.type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WorkerType } from '../entities/workerTypes.entity';

@Injectable()
export class workerTypesService {
  constructor(
    @InjectRepository(WorkerType)
    private repository: Repository<WorkerType>
  ){}

  async create(createWorkerTypeDto: CreateWorkerTypeDto) {
    let type = new WorkerType();
    type.name = createWorkerTypeDto.name;
    await this.repository.save(type);
    return type.id;
  }

async update(
  id: number,
  updateWorkerTypeDto: UpdateWorkerTypeDto) {
  console.log(`workerTypesService : update()  WorkerType ${id} not implemented yet`);
    return -1;
};

async delete(
  id: number) {

    console.log(`workerTypesService : delete()  WorkerType ${id} not implemented yet`);
    return -1
}

async getAll(): Promise<WorkerType[]> {
  return this.repository.find();
};


async getTypesByIds(ids: number[]): Promise<WorkerType[]> {
    if (ids.length >= 0){
      return this.repository.find({
                where: { id: In(ids) }
              });
    }
    return [] as WorkerType[];
  };
};

