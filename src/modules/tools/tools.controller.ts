import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ToolsService } from './services/tools.service';
import {ToolsTypesService} from './services/toolsTypes.service';
import { CreateToolDto } from './dto/tools.dto';
import { CreateToolTypeDto } from './dto/tools.type.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


const toolsPathes={
  Tools :  'Tools',
}


@ApiTags(toolsPathes.Tools)
@Controller(toolsPathes.Tools)
export class ToolsController {
  constructor(private readonly toolsService: ToolsService,
              private readonly toolsTypesService: ToolsTypesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(
    @Query('project') projectid:number,
    @Body() createToolDto: CreateToolDto) {

    const typesArray = await this.toolsTypesService.getTypesByIds(createToolDto.typesIds);
    return this.toolsService.create(projectid, createToolDto, typesArray);
  }

  @Get()
  async getToolsByProject(
    @Query('project') projectid: number) {
    return this.toolsService.getByProject(projectid);
  }

  @Get(':id')
  async getToolById(
    @Param('id') id: number,
    @Query('project') projectid: number) {
    return this.toolsService.getByIdAndProject(id, projectid);
  }

  @Get('bytype/:type')
  async getToolsByTypeId(
    @Param('type') toolTypeId: number,
    @Query('project') projectid: number) {
    return this.toolsService.getByTypeAndProject(toolTypeId,projectid);
  }
}

