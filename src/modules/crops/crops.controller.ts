import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CropsKindService } from './services/cropsKind.service';
import { CreateCropsKindDto } from './dto/create-cropsKind.dto';
import { UpdateCropsKindDto } from './dto/update-cropsKind.dto';
import { CropsService } from './services/crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CropsStrainService } from './services/cropsStrain.service';
import { CreateCropsStrainDto } from './dto/create-cropsStrain.dto';
import { UpdateCropsStrainDto } from './dto/update-cropsStrain.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

const cropsPathes={
  Kind :  'Crops/Kind',
  Crops: 'Crops/Crops',
  Strain: 'Crops/Strain'
}

@ApiTags(cropsPathes.Kind)
@Controller(cropsPathes.Kind)
export class CropsKindController {
  constructor(private readonly cropsKindService: CropsKindService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  create(@Body() createCropsKindDto: CreateCropsKindDto) {
    return this.cropsKindService.create(createCropsKindDto);
  }

  @Get()
  getAll() {
    return this.cropsKindService.getAll();
  }

  @Get(':id')
  getCropsKindById(@Param('id') id: number) {
    return this.cropsKindService.getCropsKindById(id);
  }

  @Patch("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updateCropsKind(
        @Param('id') id: number,
        @Body() updateCropsKindDto: UpdateCropsKindDto): Promise<number> {
        console.log("Crops Kind controller: updateCropsKind ${id} ")
        const cropKind = await this.cropsKindService.update(id, updateCropsKindDto);
        return cropKind;
    }

    @Delete(':id')
    async deleteCropKind(
        @Param('id') id: number) {
        console.log("Crops Kind controller: deleteCropKind ${id} ")
        const cropKind = await this.cropsKindService.delete(id);
        return cropKind;
    }
}

@ApiTags(cropsPathes.Crops)
@Controller(cropsPathes.Crops)
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  getAll() {
    return this.cropsService.getAll();
  }

  @Get('bykind/:id')
  getAllCroppsByCropsKind(@Param('id') id: number) {
    return this.cropsService.getAllCroppsByCropsKind(id);
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async updateCrops(
      @Param('id') id: number,
      @Body() updateCropDto: UpdateCropDto): Promise<number> {
      console.log("Crops  controller: updateCrops ${id} ")
      const cropKind = await this.cropsService.update(id, updateCropDto);
      return cropKind;
  }

  @Delete(':id')
  async deleteCropKind(
      @Param('id') id: number) {
      console.log("Crops controller: deleteCrop ${id} ")
      const cropKind = await this.cropsService.delete(id);
      return cropKind;
  }
}

@ApiTags(cropsPathes.Strain)
@Controller(cropsPathes.Strain)
export class CropsStrainController {
  constructor(private readonly cropsStrainService: CropsStrainService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  create(@Body() createCropsStrainDto: CreateCropsStrainDto) {
    return this.cropsStrainService.create(createCropsStrainDto);
  }

  @Get()
  getAll() {
    return this.cropsStrainService.getAll();
  }

  @Get('bycrops/:id')
  getAllCropsStrainByCrops(@Param('id') id: number) {
    return this.cropsStrainService.getAllCropsStrainByCropId(id);
  }

  @Get('bykind/:id')
  getAllCropsStrainByCropsKind(@Param('id') id: number) {
    return this.cropsStrainService.getAllCropsStrainByCropsKind(id);
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async updateCropStrain(
      @Param('id') id: number,
      @Body() updateCropsStrainDto: UpdateCropsStrainDto): Promise<number> {
      console.log("cropsStrain controller: updateCropStrain ${id} ")
      const cropStrain = await this.cropsStrainService.update(id, updateCropsStrainDto);
      return cropStrain;
  }

  @Delete(':id')
  async deleteCropStrain(
      @Param('id') id: number) {
      console.log("cropsStrain controller: deleteCropStrain ${id} ")
      const cropStrain = await this.cropsStrainService.delete(id);
      return cropStrain;
  }

}