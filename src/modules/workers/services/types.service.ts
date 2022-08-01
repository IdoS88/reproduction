import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from '../dto/type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from '../entities/types.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>
  ){}

  async create(createTypeDto: CreateTypeDto) {
    let type = new Type();
    type.name = createTypeDto.name;
    await this.typesRepository.save(type);
    return type.id;
  }

  getAll(): Promise<Type[]> {
    return this.typesRepository.find();
  }

  getTypeById(id: number): Promise<Type> {
    if (id <= 0)
      throw Error("Type id cannot be negative");
    return this.typesRepository.findOne({
      where: {id: id,}
    });
  }
}
