import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkersService } from './services/workers.service';
import { ToolsService } from './services/tools.service';
import { TypesService } from './services/types.service';
import { CreateWorkerDto } from './dto/workers.dto';
import { CreateToolDto } from './dto/tools.dto';
import { CreateTypeDto } from './dto/type.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  async getAll() {
    return this.workersService.getAll();
  }

  @Get(':id')
  async getWorkerById(@Param('id') id: number) {
    return this.workersService.getWorkerById(id);
  }

  @Get('bytype/:id')
  async getAllWorkersByTypeId(@Param('id') id: number) {
    return this.workersService.getAllWorkersByTypeId(id);
  }
}

@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createToolDto: CreateToolDto): Promise<number> {
    return await this.toolsService.create(createToolDto);
  }

  @Get()
  async getAll() {
    return await this.toolsService.getAll();
  }

  @Get(':id')
  async getToolById(@Param('id') id: number) {
    return await this.toolsService.getToolById(id);
  }

  @Get('bytype/:id')
  async getAllWorkersByTypeId(@Param('id') id: number) {
    return await this.toolsService.getAllToolsByType(id);
  }
}

@ApiTags('Types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createTypeDto: CreateTypeDto): Promise<number> {
    return await this.typesService.create(createTypeDto);
  }

  @Get()
  async getAll() {
    return await this.typesService.getAll();
  }

  @Get(':id')
  async getTypeById(@Param('id') id: number) {
    return await this.typesService.getTypeById(id);
  }
}