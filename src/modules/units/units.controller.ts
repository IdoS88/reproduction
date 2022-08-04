import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UnitsService } from './services/units.service';
import { UnitsFamilyService } from './services/unitsfamily.service';
import { CreateUnitDto, UpdateUnitDto } from './dto/unit.dto';
import { CreateUnitsFamilyDto, UpdateUnitsFamilyDto } from './dto/unitsFamily.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  //constructor(private readonly unitsService: UnitsService) {}
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createUnitDto: CreateUnitDto): Promise<number> {
    console.log(`units controller  name= ${createUnitDto.name}`)
    return await this.unitsService.create(createUnitDto);
  }

  @Get()
  async getAll() {
    return this.unitsService.getAll();
  }

  @Get(':id')
  async getUnitById(@Param('id') id: string) {
    return this.unitsService.getUnitById(+id);
  }

  @Get('/family/:familyid')
  async getUnitsByFamilyId(@Param('familyid')  familyid: string) {
    return await this.unitsService.getByFamilyId(+familyid);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitsService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.unitsService.delete(+id);
  }
}

@ApiTags('Units Family')
@Controller('unitsfamily')
export class UnitsFamilyController {
  constructor(private readonly unitsFamilyService: UnitsFamilyService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createUnitsFamilyDto: CreateUnitsFamilyDto): Promise<number> {
    console.log(`unitsfamily controller  name= ${createUnitsFamilyDto.name}`)
    return await this.unitsFamilyService.create(createUnitsFamilyDto);
  }

  @Get()
  async getAll() {
    return await this.unitsFamilyService.getAll();
  }

  @Get(':id')
  async getUnitsFamilyById(@Param('id') id: string) {
    return await this.unitsFamilyService.getUnitsFamilyById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUnitsFamilyDto: UpdateUnitsFamilyDto) {
    return await this.unitsFamilyService.update(+id, updateUnitsFamilyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.unitsFamilyService.delete(+id);
  }
}