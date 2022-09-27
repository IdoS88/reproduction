import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CropStrainService } from '../services/cropStrain.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCropStrainDto, UpdateCropStrainDto} from '../dto/cropStrain.dto'


@ApiTags('Crop/Strain')
@Controller('Crop/Strain')
export class CropStrainController {
  constructor(
     private cropStrainService: CropStrainService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCropStrain(@Body() createDto: CreateCropStrainDto) {
    return await this.cropStrainService.create(createDto);
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async updateCropStrain(
      @Param('id') id: number,
      @Body() updateCropStrainDto: UpdateCropStrainDto) {
      console.log("CropStrain controller: updateCroptrain ${id} ")
      const Croptrain = await this.cropStrainService.update(id, updateCropStrainDto);
      return Croptrain;
  }

  @Delete(':id')
  async deleteCropStrain(
      @Param('id') id: number) {
      console.log("CropStrain controller: deleteCroptrain ${id} ")
      const Croptrain = await this.cropStrainService.delete(id);
      return Croptrain;
  }

  @Get()
  async getAll() {
    return await this.cropStrainService.getAll();
  }

  @Get('byCrop/:id')
  async getAllCropStrainByCrop(@Param('id') id: number) {
    return await this.cropStrainService.getAllCropStrainByCropId(id);
  }

  @Get('byType/:id')
  async getAllCropStrainByCropType(@Param('id') id: number) {
    return await this.cropStrainService.getAllCropStrainByType(id);
  }


  @Get('byProject/:id')
  async getAllCropStrainsByProject(@Param('id') id: number) {
    const strainsDictionary = await this.cropStrainService.getAllCropStrainByProject(id);
    //console.log(CropDictionary)
    //console.log( Object.fromEntries(CropDictionary))
    return Object.fromEntries(strainsDictionary)
  }

}