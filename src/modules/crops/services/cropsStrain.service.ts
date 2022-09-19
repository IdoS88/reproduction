import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCropsStrainDto, UpdateCropsStrainDto } from '../dto/cropsStrain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CropsStrain } from '../entities/cropsStrain.entity';
import { Crops } from '../entities/crop.entity';
import { GenericEntityService } from 'src/modules/infrastructures/services/service.generic';
import { CropsValidator } from './crops.validator';
import { CropsService } from './crops.service';


@Injectable()
export class CropsStrainService extends  GenericEntityService <CropsStrain, CropsValidator>{
  constructor(
    @InjectRepository(CropsStrain)
    protected cropsStrainRepository: Repository<CropsStrain>,
    protected validator: CropsValidator,
    @Inject(forwardRef(() => CropsService)) private cropService: CropsService
  ){
    super(cropsStrainRepository, validator);
  }

  async create(createCropsStrainDto: CreateCropsStrainDto): Promise<CropsStrain|null> {
    let cropsStrain = new CropsStrain();
    cropsStrain.name = createCropsStrainDto.name;
    cropsStrain.color = createCropsStrainDto.color;
    
    let cropObject=await this.cropService.getCropById(createCropsStrainDto.cropId)
    if (this.validator.checkEntity(cropObject)){
      cropsStrain.cropId = createCropsStrainDto.cropId;
      
    }

    await this.cropsStrainRepository.save(cropsStrain);
    return cropsStrain;
  }
  async update(
    id: number,
    updateCropsStrainDto: UpdateCropsStrainDto): Promise<CropsStrain|null> {
      console.log('cropsStrainRepository : update()  cropStrain ${id} ');
      //return null;
      let result = null;
  
      let cropStrainEntities = await this.getCropsStrainByStrainIds([id])
      this.validator.checkEntity(cropStrainEntities)
      let cropStrainEntity=cropStrainEntities[0] //after validate array is not empty

      let oldCropObject = cropStrainEntity.crop;
      let newCropObject: Crops = null
      if (updateCropsStrainDto.cropId !== null){
        if ((oldCropObject===null) || (oldCropObject.id !=updateCropsStrainDto.cropId)){
          newCropObject=await this.cropService.getCropById(updateCropsStrainDto.cropId)
        }
      }

     // if (this.validator.checkProjectLink(projectObject, updateDTO.crop_strainId)){
        //save plot with relevant crops strains
      cropStrainEntity.name=updateCropsStrainDto.name;
      cropStrainEntity.cropId=updateCropsStrainDto.cropId;
      cropStrainEntity.color=updateCropsStrainDto.color;
      cropStrainEntity.crop=newCropObject;
  
      result  = await this.repository.save(cropStrainEntity);
      
      return result;
  };

  async delete(
    id: number): Promise<any> {
      console.log('cropsStrainRepository : delete()  cropStrain ${id} not implemented yet');
      return null;
  };

  
  
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

  
  //Called on create/update project , when it gets list of cropstrains Ids
  getCropsStrainByStrainIds(cropStrainIds: number[]): Promise<CropsStrain[]> {
    return this.cropsStrainRepository.find({
      where: {
        id: In (cropStrainIds)
      },
      relations:['crop']
    });
  }



  async getAllCropsStrainByKind(cropkindid: number): Promise<CropsStrain[]> {
    // SELECT * FROM crops.crops_strain JOIN crops.crop ON crops_strain.cropId = crop.id WHERE crop.kindId = '2';
    if (cropkindid <= 0)
      throw Error("CropsKind id cannot be negative");
    return await this.cropsStrainRepository.createQueryBuilder('cs')
      .select('cs') //(['cs.id', 'cs.name', 'cs.color', 'cs.cropId'])
      .leftJoin(Crops, "c", "c.id = cs.cropId")
      .where('c.kindId = :ckid', { ckid: cropkindid})
      .getMany();
  }

  }
