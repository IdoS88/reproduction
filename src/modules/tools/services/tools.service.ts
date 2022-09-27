import { Injectable } from '@nestjs/common';
import { CreateToolDto } from '../dto/tools.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entities/tools.entity';
import { ToolType } from '../entities/toolTypes.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private repository: Repository<Tool>
  ){}

  async create(
    projectid: number, 
    createToolDto: CreateToolDto,
    toolTypes: ToolType[]) {
    
    let tool = new Tool();
    tool.name = createToolDto.name;
    tool.projectId = projectid;
    tool.types =  toolTypes;
    await this.repository.save(tool);

    // let typesarray = createToolDto.typesid.toString().split(",")
    // typesarray.forEach(typeid => {
    //   this.createToolToTypes(tool.id, parseInt(typeid));
    // });
    return tool.id;
  }

  // async createToolToTypes(toolid: number, tooltypeid: number) {
  //   let tooltotypes = new ToolToTypes();
  //   tooltotypes.toolid = toolid;
  //   tooltotypes.typeid = tooltypeid;
  //   await this.toolToTypesRepository.save(tooltotypes);
  //   return tooltotypes.id;
  // }

  // getAll(): Promise<Tool[]> {
  //   return this.toolsRepository.find();
  // }

  async getByProject(projectId: number): Promise<Tool[]> {
    console.log(`toolService : getByProject() for project ${projectId}`);
    return this.repository.find({
      where: {
        projectId: projectId
      }
    });
  }

  
  async getByIdAndProject(id: number, projectId: number): Promise<Tool> {
    console.log(`toolService : getByIdAndProject() with ID ${id} and project ${projectId}`);
    if (id <= 0)
      throw Error("Tool id cannot be negative");
    return this.repository.findOne({
      where: {
        id: id,
        projectId: projectId
      }
    });
  }

  async getByTypeAndProject(typeid: number, projectId: number): Promise<Tool[]> {
    console.log(`toolService : getByTypeAndProject() for type ${typeid} and project ${projectId}`);
  // SELECT * FROM Crop.tool JOIN Crop.tool_to_types ON worker.id = tool_to_types.toolid WHERE tool_to_types.typeid = '2';
  if (typeid <= 0)
    throw Error("Type id cannot be negative");

  return this.repository.find({
    relations:{
      types: true,
    },
    where: {
      projectId : projectId
    }
  });
};
    
  // return await this.repository.createQueryBuilder('tool')
  //     .select('tool')
  //     .leftJoin(ToolToTypes, "tt", "tool.id = tt.toolid")
  //     .where('tt.typeid = :tid', { tid: typeid})
  //     .getMany();
//}
}
