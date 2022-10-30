import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GenericEntityService } from 'src/modules/infrastructures/services/service.generic';
import { CreateCropDto, UpdateCropDto } from '../dto/crop.dto'
import { Crop } from '../entities/crop.entity';
import { CropValidator } from './crops.validator';
import { CropsConnectionService } from './crops.connection.service';

type relationsType = "none" | "type" | "strains" | "all";


@Injectable()
export class CropService extends GenericEntityService<Crop, CropValidator> {
  constructor(
    @InjectRepository(Crop)
    protected repository: Repository<Crop>,
    @Inject(CropsConnectionService) private cropsConnectionService: CropsConnectionService
  ) {
    super(repository);
    this.validator = new CropValidator(this);
  }

  private getRelationsRequest(relationsStr: relationsType): string[] {
    let relatios = [];
    switch (relationsStr) {
      case "none": { break; }
      case "all": { relatios = ["type", "strains"]; break; }
      default: { relatios = [relationsStr]; break; }
    }
    return relatios
  }

  async create(createCropDto: CreateCropDto): Promise<Crop | null> {
    let crop = new Crop();
    crop.name = createCropDto.name;
    crop.color = createCropDto.color;
    crop.typeId = createCropDto.typeId;
    await this.repository.save(crop);
    return crop
  }
  async update(
    id: number,
    updateCropDTO: UpdateCropDto) {
    let result = null;

    console.log(`CropService : update()  crop ${id} `);
    let cropEntity = await this.getCropById(id, "all")
    this.validator.checkEntity(cropEntity)

    if (cropEntity.typeId != updateCropDTO.typeId) {
      let newCropTypeObject = await this.cropsConnectionService.getCropTypeById(updateCropDTO.typeId)
      this.validator.checkEntity(newCropTypeObject)
    }
    cropEntity.typeId = updateCropDTO.typeId;
    cropEntity.name = updateCropDTO.name;
    cropEntity.color = updateCropDTO.color;

    result = await this.repository.save(cropEntity);

    return result;

  };

  async delete(
    id: number): Promise<any> {
    console.log('CropTypeRepository : delete()  CropType ${id} not implemented yet');
    return null;
  };

  getAll(relationsStr: relationsType = "none"): Promise<Crop[] | null> {
    let result = null
    let relations = this.getRelationsRequest(relationsStr);

    result = this.repository.find({
      relations: relations
    });
    return result;
  }

  getCropById(
    id: number,
    relationsStr: relationsType = "none"): Promise<Crop> {
    let result = null
    let relatios = this.getRelationsRequest(relationsStr);
    //if (id <= 0)
    //  throw Error("Crop id cannot be negative");
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: relatios
    });
  }

  async getAllCropByType(CropTypeid: number): Promise<Crop[]> {
    if (CropTypeid <= 0)
      throw Error("CropType id cannot be negative");

    return this.repository.find({
      where: { typeId: CropTypeid },
      relations: ['type']
    });

  }

  async getAllCropByStrainIds(CropStrainIds: number[]): Promise<Crop[]> {
    let CropStrain = await this.cropsConnectionService.getAllStrainsByStrainIds(CropStrainIds)

    //let CropStrain= await this.cropStrainService.getCropStrainByStrainIds(CropStrainIds)

    let crops: Crop[] = [];
    for (const strain of CropStrain) {
      crops.push(strain.crop)
    }
    return crops;
  }

  // async getAllCropByIds(CropsIds: number[]): Promise<Crop[]> {
  //   let CropStrains=  this.repository.find({
  //     where: {id: In(CropsIds)},
  //     relations: ['type']
  //   });
  //   return(CropStrains)
  // }

  async getAllCropsByProject(projectId: number): Promise<Map<number, Crop>> {

    let cropStrains = await this.cropsConnectionService.getStrainsByProject(projectId)
    const CropDictionary = new Map<number, Crop>();

    if (cropStrains.length > 0) {
      let cropStrainsMap = new Map(
        cropStrains.map(e => { return [e.id, e] }))

      let cropStrainsIds = Array.from(cropStrainsMap.keys())

      let cropObjects = await this.cropsConnectionService.getAllCropsByStrainIds(cropStrainsIds)
      if (cropObjects.length > 0) {
        for (const crop of cropObjects) {
          CropDictionary.set(crop.id, crop);
        }
      }
    }
    return CropDictionary
  }
}