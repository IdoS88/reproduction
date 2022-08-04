import { Injectable } from '@nestjs/common';
import { CreateCropsStrainDto } from '../dto/create-cropsStrain.dto';
import { UpdateCropsStrainDto } from '../dto/update-cropsStrain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropsStrain } from '../entities/cropsStrain.entity';
import { CropsService } from './crops.service';
import { Crops } from '../entities/crop.entity';


@Injectable()
export class CropsStrainService {
  constructor(
    @InjectRepository(CropsStrain)
    private cropsStrainRepository: Repository<CropsStrain>,
    private cropsService: CropsService
  ){}

  async create(createCropsStrainDto: CreateCropsStrainDto) {
    let cropsStrain = new CropsStrain();
    cropsStrain.name = createCropsStrainDto.name;
    cropsStrain.color = createCropsStrainDto.color;
    cropsStrain.cropId = createCropsStrainDto.cropId;
    await this.cropsStrainRepository.save(cropsStrain);
    return cropsStrain.id;
  }

  getAll(): Promise<CropsStrain[]> {
    return this.cropsStrainRepository.find();
  }

  getAllCropsStrainByCropId(cropid: number): Promise<CropsStrain[]> {
    if (cropid <= 0)
      throw Error("Crop id cannot be negative");
    return this.cropsStrainRepository.find({
      where: {cropId: cropid,}
    });
  }

  async getAllCropsStrainByCropsKind(cropkindid: number): Promise<CropsStrain[]> {
    // SELECT * FROM crops.crops_strain JOIN crops.crop ON crops_strain.cropId = crop.id WHERE crop.kindId = '2';
    if (cropkindid <= 0)
      throw Error("CropsKind id cannot be negative");
    return await this.cropsStrainRepository.createQueryBuilder('cs')
      .select('cs') //(['cs.id', 'cs.name', 'cs.color', 'cs.cropId'])
      .leftJoin(Crops, "c", "c.id = cs.cropId")
      .where('c.kindId = :ckid', { ckid: cropkindid})
      .getMany();
  }

  async update(
    id: number,
    updateCropsStrainDto: UpdateCropsStrainDto) {
      console.log('cropsStrainRepository : update()  cropStrain ${id}  not implemented yet');
      return -1;
  };

  async delete(
    id: number): Promise<any> {
      console.log('cropsStrainRepository : delete()  cropStrain ${id} not implemented yet');
      return null;
  };
}
