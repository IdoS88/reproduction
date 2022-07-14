import { Injectable } from '@nestjs/common';
import { CreateToolDto } from '../dto/create-tool.dto'; 
import { UpdateToolDto } from '../dto/update-tool.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entities/tools.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private toolsRepository: Repository<Tool>
  ){}

  async create(createToolDto: CreateToolDto) {
    let tool = new Tool();
    tool.name = createToolDto.name;
    tool.projectId = createToolDto.projectId;
    tool.typesId = createToolDto.typesId;
    await this.toolsRepository.save(tool);
    return tool.id;
  }

  getAll(): Promise<Tool[]> {
    return this.toolsRepository.find();
  }

  getToolById(id: number): Promise<Tool> {
    if (id <= 0)
      throw Error("Tool id cannot be negative");
    return this.toolsRepository.findOne({
      where: {id: id,}
    });
  }

// getAllToolsByType(typeid: number): Promise<Tool[]> {}
}
