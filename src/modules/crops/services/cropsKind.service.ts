import { Injectable } from '@nestjs/common';
import { CreateCropsKindDto } from '../dto/create-cropsKind.dto';
import { UpdateCropsKindDto } from '../dto/update-cropsKind.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropsKind } from '../entities/cropsKind.entity';
import { Crops } from '../entities/crop.entity';
import { CropsStrain } from '../entities/cropsStrain.entity';


@Injectable()
export class CropsKindService {
  constructor(
    @InjectRepository(CropsKind)
    private cropsKindRepository: Repository<CropsKind>,
  ){}

  async create(createCropsKindDto: CreateCropsKindDto) {
    let cropKind = new CropsKind();
    cropKind.name = createCropsKindDto.name;
    await this.cropsKindRepository.save(cropKind);
    return cropKind.id;
  }

  getAll(): Promise<CropsKind[]> {
    return this.cropsKindRepository.find();
  }

  getCropsKindById(id: number): Promise<CropsKind> {
    if (id <= 0)
      throw Error("CropsKind id cannot be negative");
    return this.cropsKindRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(
    id: number, 
    updateCropsKindDto: UpdateCropsKindDto) {
      console.log('cropsKindRepository : update()  cropKind ${id}  not implemented yet');
      return -1;
  };

  async delete(
    id: number): Promise<any> {
      console.log('cropsKindRepository : delete()  cropKind ${id} not implemented yet');
      return null;
  };
}
