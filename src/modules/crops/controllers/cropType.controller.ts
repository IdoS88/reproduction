import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CropType } from '../entities/cropType.entity'
import { CropTypeService } from '../services/cropType.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCropTypeDto, UpdateCropTypeDto} from '../dto/cropType.dto'

@ApiTags('Crop/Type')
@Controller('Crop/Type')
export class CropTypeController {
  constructor(
     private cropTypeService: CropTypeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  create(@Body() createCropTypeDto: CreateCropTypeDto) {
    return this.cropTypeService.create(createCropTypeDto);
  }

  @Get()
  getAll() {
    return this.cropTypeService.getAll();
  }

  @Get(':id')
  getCropTypeById(@Param('id') id: number) {
    return this.cropTypeService.getCropTypeById(id);
  }

  @Patch("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async update(
        @Param('id') id: number,
        @Body() updateCropTypeDto: UpdateCropTypeDto): Promise<CropType|null> {
        console.log("Crop Kind controller: updateCropType ${id} ")
        const CropType = await this.cropTypeService.update(id, updateCropTypeDto);
        return CropType;
    }

    @Delete(':id')
    async deletes(
        @Param('id') id: number) {
        console.log("Crop Kind controller: deleteCropType ${id} ")
        const CropType = await this.cropTypeService.delete(id);
        return CropType;
    }

    @Get('byProject/:id')
    async getAllCropsTypeByProject(@Param('id') id: number) {
      const CropDictionary = await this.cropTypeService.getAllCropsTypeByProject(id);
      //console.log(CropDictionary)
      //console.log( Object.fromEntries(CropDictionary))
      return Object.fromEntries(CropDictionary)
    }
}
