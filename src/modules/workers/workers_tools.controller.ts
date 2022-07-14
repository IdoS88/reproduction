import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkersService } from './services/workers.service';
import { ToolsService } from './services/tools.service';
import { TypesService } from './services/types.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { CreateToolDto } from './dto/create-tool.dto';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  getAll() {
    return this.workersService.getAll();
  }

  @Get(':id')
  getWorkerById(@Param('id') id: number) {
    return this.workersService.getWorkerById(id);
  }
}

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  getAll() {
    return this.toolsService.getAll();
  }

  @Get(':id')
  getToolById(@Param('id') id: number) {
    return this.toolsService.getToolById(id);
  }
}

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  getAll() {
    return this.typesService.getAll();
  }

  @Get(':id')
  getTypeById(@Param('id') id: number) {
    return this.typesService.getTypeById(id);
  }
}