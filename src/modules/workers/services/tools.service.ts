import { Injectable } from '@nestjs/common';
import { CreateToolDto } from '../dto/tools.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool, ToolToTypes } from '../entities/tools.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private toolsRepository: Repository<Tool>,
    @InjectRepository(ToolToTypes)
    private toolToTypesRepository: Repository<ToolToTypes>
  ){}

  async create(createToolDto: CreateToolDto) {
    let tool = new Tool();
    tool.name = createToolDto.name;
    tool.projectid = createToolDto.projectid;
    tool.typesid = createToolDto.typesid;
    await this.toolsRepository.save(tool);

    let typesarray = createToolDto.typesid.toString().split(",")
    typesarray.forEach(typeid => {
      this.createToolToTypes(tool.id, parseInt(typeid));
    });
    return tool.id;
  }

  async createToolToTypes(toolid: number, tooltypeid: number) {
    let tooltotypes = new ToolToTypes();
    tooltotypes.toolid = toolid;
    tooltotypes.typeid = tooltypeid;
    await this.toolToTypesRepository.save(tooltotypes);
    return tooltotypes.id;
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

  async getAllToolsByType(typeid: number): Promise<Tool[]> {
  // SELECT * FROM crops.tool JOIN crops.tool_to_types ON worker.id = tool_to_types.toolid WHERE tool_to_types.typeid = '2';
  if (typeid <= 0)
    throw Error("Type id cannot be negative");
  return await this.toolsRepository.createQueryBuilder('tool')
      .select('tool')
      .leftJoin(ToolToTypes, "tt", "tool.id = tt.toolid")
      .where('tt.typeid = :tid', { tid: typeid})
      .getMany();
}
}
