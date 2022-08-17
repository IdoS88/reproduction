import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, 
         ValidationPipe, Query, HttpException } from '@nestjs/common';
import { WorkerType } from './entities/workerTypes.entity';
import { Worker } from './entities/workers.entity';
import { WorkersService } from './services/workers.service';
import { workerTypesService } from './services/workerTypes.service';
import { CreateWorkerDto, UpdateWorkerDto } from './dto/workers.dto';
import { CreateWorkerTypeDto, UpdateWorkerTypeDto } from './dto/worker.type.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { httpResponses} from 'src/modules/commons/routes.constants';

const workerPathes={
  Workers :  'Workers/Workers',
  Types : 'Workers/Types'
}


@ApiTags(workerPathes.Workers)
@Controller(workerPathes.Workers)
export class WorkersController {
  constructor(private readonly workersService: WorkersService,
              private readonly workersTypesService: workerTypesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(
    @Query('project') projectid:number,
    @Body() createWorkerDto: CreateWorkerDto) {

    const typesArray = await this.workersTypesService.getTypesByIds(createWorkerDto.typesIds);
    return this.workersService.create(projectid, createWorkerDto, typesArray);
  }

  @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 531, description: 'update functionality not implemented.'})
    async update(
      @Param('id') id: number,
      @Query('project') projectid:number,
      @Body() updateWorkerDto: UpdateWorkerDto) {
      
        throw new HttpException(httpResponses.UPDATE_NOT_IMPLEMENTED.description, 
                                httpResponses.UPDATE_NOT_IMPLEMENTED.status);
        //Shoild this if validate types ids before updating ? 
        const typesArray = await this.workersTypesService.getTypesByIds(updateWorkerDto.typesIds);
        return await this.workersService.update(id, projectid, updateWorkerDto, typesArray);
  }
  
  @Delete('/:id')
  @ApiResponse({ status: 532, description: 'delete functionality not implemented.'})
  async deletePlot(
    @Param('id') id: number,
    @Query('project') projectid : number) {
      throw new HttpException(httpResponses.DELETE_NOT_IMPLEMENTED.description, 
                              httpResponses.DELETE_NOT_IMPLEMENTED.status);
      const workers = await this.workersService.delete(id, projectid);
      return workers;
  }

  @Get()
  async getWorkersByProject(
    @Query('project') projectid: number): Promise<Worker[]> {
    return this.workersService.getByProject(projectid);
  }

  @Get(':id')
  async getWorkerById(
    @Param('id') id: number,
    @Query('project') projectid: number) {
    return this.workersService.getByIdAndProject(id, projectid);
  }

  @Get('/Type/:type')
  async getWorkersByTypeId(
    @Param('type') workerTypeId: number,
    @Query('project') projectid: number) {
    return this.workersService.getByTypeAndProject(workerTypeId,projectid);
  }
}

@ApiTags(workerPathes.Types)
@Controller(workerPathes.Types)
export class WorkersTypesController {
  constructor(private readonly workersTypesService: workerTypesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(
    @Body() createWorkerTypeDto: CreateWorkerTypeDto) {
    return await this.workersTypesService.create(createWorkerTypeDto);
  }

  @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 531, description: 'update functionality not implemented.'})
    async update(
      @Param('id') id: number,
      @Body() updateWorkerTypeDto: UpdateWorkerTypeDto) {
        throw new HttpException(httpResponses.UPDATE_NOT_IMPLEMENTED.description, 
        httpResponses.UPDATE_NOT_IMPLEMENTED.status);
      return await this.workersTypesService.update(id, updateWorkerTypeDto);
  }

  @Delete('/:id')
  @ApiResponse({ status: 532, description: 'delete functionality not implemented.'})
  async delete(
    @Param('id') id: number) {
      throw new HttpException(httpResponses.DELETE_NOT_IMPLEMENTED.description, 
                              httpResponses.DELETE_NOT_IMPLEMENTED.status);
      const workers = await this.workersTypesService.delete(id);
      return workers;
  }

  @Get()
  async getAllWorkerTypes(): Promise<WorkerType[]> {
    return this.workersTypesService.getAll();
  }

  @Get(':id')
  async getWorkerTypeById(
    @Param('id') id: number) {
    return this.workersTypesService.getTypesByIds([id]);
  }
}
