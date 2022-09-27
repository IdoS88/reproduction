import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CropService } from '../services/crop.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCropDto, UpdateCropDto} from '../dto/crop.dto'

@ApiTags('Crop/Crop')
@Controller('Crop/Crop')
export class CropController {
  constructor(
     private cropService: CropService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCrop(@Body() createCropDto: CreateCropDto) {
    return await this.cropService.create(createCropDto);
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async updateCrop(
      @Param('id') id: number,
      @Body() updateCropDto: UpdateCropDto): Promise<number> {
      console.log("Crop  controller: updateCrop ${id} ")
      const CropType = await this.cropService.update(id, updateCropDto);
      return CropType;
  }

  @Delete(':id')
  async deleteCrop(
      @Param('id') id: number) {
      console.log("Crop controller: deleteCrop ${id} ")
      return await this.cropService.delete(id);
  }

  @Get()
  async getAll() {
    return await this.cropService.getAll("type");
    //return this.CropService.getAll("all");
    
  }

  @Get('bytype/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllCropByType(@Param('id') id: number) {
    return await this.cropService.getAllCropByType(id);
  }

  

  @Get('byProject/:id')
  async getAllCropByProject(@Param('id') id: number) {
    const CropDictionary = await this.cropService.getAllCropsByProject(id);
    //console.log(CropDictionary)
    //console.log( Object.fromEntries(CropDictionary))
    return Object.fromEntries(CropDictionary)
  }
}