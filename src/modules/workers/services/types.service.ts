import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from '../dto/type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerType } from '../entities/workerTypes.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(WorkerType)
    private typesRepository: Repository<WorkerType>
  ){}

  async create(createTypeDto: CreateTypeDto) {
    let type = new WorkerType();
    type.name = createTypeDto.name;
    await this.typesRepository.save(type);
    return type.id;
  }

  getAll(): Promise<WorkerType[]> {
    return this.typesRepository.find();
  }

  getTypeById(id: number): Promise<WorkerType> {
    if (id <= 0)
      throw Error("Type id cannot be negative");
    return this.typesRepository.findOne({
      where: {id: id,}
    });
  }
}
