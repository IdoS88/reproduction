import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateToolTypeDto, UpdateToolTypeDto } from '../dto/tools.type.dto';
import { ToolType } from '../entities/toolTypes.entity';

@Injectable()
export class ToolsTypesService {
  constructor(
    @InjectRepository(ToolType)
    private repository: Repository<ToolType>
  ){}

  async create(createToolTypeDto: CreateToolTypeDto) {
    let type = new ToolType();
    type.name = createToolTypeDto.name;
    await this.repository.save(type);
    return type.id;
  }

async getAll(): Promise<ToolType[]> {
  return this.repository.find();
};


async getTypesByIds(ids: number[]): Promise<ToolType[]> {
    if (ids.length >= 0){
      return this.repository.find({
                where: { id: In(ids) }
              });
    }
    return [] as ToolType[];
  };
};

