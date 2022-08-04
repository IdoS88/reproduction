import { Injectable } from '@nestjs/common';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crops } from '../entities/crop.entity';
import { CropsStrain } from '../entities/cropsStrain.entity';
import { CropsKindService } from './cropsKind.service';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crops)
    private cropRepository: Repository<Crops>,
    private cropsKindService: CropsKindService
  ){}

  async create(createCropDto: CreateCropDto) {
    let crop = new Crops();
    crop.name = createCropDto.name;
    crop.color = createCropDto.color;
    crop.kindId = createCropDto.kindId;
    await this.cropRepository.save(crop);
    return crop.id;
  }

  getAll(): Promise<Crops[]> {
    return this.cropRepository.find();
  }

  getCropById(id: number): Promise<Crops> {
    if (id <= 0)
      throw Error("Crop id cannot be negative");
    return this.cropRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  getAllCroppsByCropsKind(cropkindid: number): Promise<Crops[]> {
    if (cropkindid <= 0)
      throw Error("CropsKind id cannot be negative");
    return this.cropRepository.find({
      where: {kindId: cropkindid}
    });
  }

  async update(
    id: number, 
    updateCropDto: UpdateCropDto) {
      console.log('cropsKindRepository : update()  cropKind ${id}  not implemented yet');
      return -1;
  };

  async delete(
    id: number): Promise<any> {
      console.log('cropsKindRepository : delete()  cropKind ${id} not implemented yet');
      return null;
  };
}
