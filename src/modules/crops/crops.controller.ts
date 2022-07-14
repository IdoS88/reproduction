import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CropsKindService } from './services/cropsKind.service';
import { CreateCropsKindDto } from './dto/create-cropsKind.dto';
import { UpdateCropsKindDto } from './dto/update-cropsKind.dto';
import { CropsService } from './services/crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CropsStrainService } from './services/cropsStrain.service';
import { CreateCropsStrainDto } from './dto/create-cropsStrain.dto';
import { UpdateCropsStrainDto } from './dto/update-cropsStrain.dto';

@Controller('cropsKind')
export class CropsKindController {
  constructor(private readonly cropsKindService: CropsKindService) {}

  @Post()
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
}

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
  //   return this.cropsService.update(+id, updateCropDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cropsService.remove(+id);
  // }
}

@Controller('cropsStrain')
export class CropsStrainController {
  constructor(private readonly cropsStrainService: CropsStrainService) {}

  @Post()
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
}