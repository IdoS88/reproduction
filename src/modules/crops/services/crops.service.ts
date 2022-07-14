import { Injectable } from '@nestjs/common';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../entities/crop.entity';
import { CropsStrain } from '../entities/cropsStrain.entity';
import { CropsKindService } from './cropsKind.service';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
    private cropsKindService: CropsKindService
  ){}

  async create(createCropDto: CreateCropDto) {
    let crop = new Crop();
    crop.name = createCropDto.name;
    crop.color = createCropDto.color;
    crop.kindId = createCropDto.kindId;
    await this.cropRepository.save(crop);
    return crop.id;
  }

  getAll(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  getCropById(id: number): Promise<Crop> {
    if (id <= 0)
      throw Error("Crop id cannot be negative");
    return this.cropRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  getAllCroppsByCropsKind(cropkindid: number): Promise<Crop[]> {
    if (cropkindid <= 0)
      throw Error("CropsKind id cannot be negative");
    return this.cropRepository.find({
      where: {kindId: cropkindid}
    });
  }

  // update(id: number, updateCropDto: UpdateCropDto) {
  //   return `This action updates a #${id} crop`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} crop`;
  // }
}
