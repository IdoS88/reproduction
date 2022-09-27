import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GenericEntityService } from 'src/modules/infrastructures/services/service.generic';
import { CreateCropStrainDto,  UpdateCropStrainDto} from '../dto/cropStrain.dto'
import { CropStrain } from '../entities/cropStrain.entity';
import { Crop } from '../entities/crop.entity';
import { CropValidator } from './crops.validator';
import {CropsConnectionService} from './crops.connection.service';

@Injectable()
export class CropStrainService extends  GenericEntityService <CropStrain, CropValidator> {
  constructor(
      @InjectRepository(CropStrain)
      protected cropStrainRepository: Repository<CropStrain>,
      @Inject(CropsConnectionService) private cropsConnectionService: CropsConnectionService
    ){
      super(cropStrainRepository);
      this.validator=new CropValidator(this);
    }

    async create(createCropStrainDto: CreateCropStrainDto): Promise<CropStrain|null> {
      let cropStrain = new CropStrain();
      cropStrain.name = createCropStrainDto.name;
      cropStrain.color = createCropStrainDto.color;
      
     // let cropObject=await this.cropService.getCropById(createCropStrainDto.cropId, "type")
     let cropObject= await this.cropsConnectionService.getCropById(createCropStrainDto.cropId)
      if (this.validator.checkEntity(cropObject)){
        cropStrain.cropId = createCropStrainDto.cropId;
        cropStrain.typeId = cropObject.typeId;
      }
  
      await this.cropStrainRepository.save(cropStrain);
      return cropStrain;
    } 
    
    async update(
      id: number,
      updateCropStrainDto: UpdateCropStrainDto): Promise<CropStrain|null> {
        console.log(`CropStrainRepository : update()  Croptrain ${id} `);
        //return null;
        let result = null;
    
        let CropStrainEntity = await this.getCropServiceById(id)
        this.validator.checkEntity(CropStrainEntity)
  
        let newCropObject: Crop = null
        if (updateCropStrainDto.cropId !== null){
            newCropObject=await this.cropsConnectionService.getCropById(updateCropStrainDto.cropId)
            this.validator.checkEntity(newCropObject)
        }
  
       // if (this.validator.checkProjectLink(projectObject, updateDTO.crop_strainId)){
          //save plot with relevant Crop strains
        CropStrainEntity.name=updateCropStrainDto.name;
        CropStrainEntity.cropId=updateCropStrainDto.cropId;
        CropStrainEntity.color=updateCropStrainDto.color;
        CropStrainEntity.crop=newCropObject;
        CropStrainEntity.typeId=newCropObject.typeId;
    
        result  = await this.repository.save(CropStrainEntity);
        
        return result;
    };
  
    async delete(
      id: number): Promise<any> {
        console.log('CropStrainRepository : delete()  Croptrain ${id} not implemented yet');
        return null;
    };   
    
    getAll(): Promise<CropStrain[]> {
      return this.cropStrainRepository.find();
    }
  
    async getCropServiceById(cropStrainId: number): Promise<CropStrain> {
      return await this.cropStrainRepository.findOne({
        where : {id: cropStrainId},
        relations: ["crop"]
      });
    }

    getAllCropStrainByCropId(cropid: number): Promise<CropStrain[]> {
      if (cropid <= 0)
        throw Error("Crop id cannot be negative");
      return this.cropStrainRepository.find({
        where: {cropId: cropid,}
      });
    }
  
    
    //Called on create/update project , when it gets list of CropStrains Ids
    getCropStrainByStrainIds(CroptrainIds: number[]): Promise<CropStrain[]|null> {
      return this.cropStrainRepository.find({
        where: {
          id: In (CroptrainIds)
        },
        relations:['crop']
      });
    }
  
    async getAllCropStrainByType(CropTypeid: number): Promise<CropStrain[]> {
      // SELECT * FROM Crop.Crop_strain JOIN Crop.crop ON Crop_strain.cropId = crop.id WHERE crop.kindId = '2';
      if (CropTypeid <= 0)
        throw Error("CropType id cannot be negative");
      return this.cropStrainRepository.find({
          where: {
            typeId: CropTypeid
          },
          relations:['cropType']
        });
    }
  
    async getAllCropStrainByProject(projectId: number): Promise<Map<number, CropStrain>> {
      // SELECT * FROM Crop.Crop_strain JOIN Crop.crop ON Crop_strain.cropId = crop.id WHERE crop.kindId = '2';
      if (projectId <= 0)
        throw Error("CropType id cannot be negative");
  
      let CropStrains = await this.cropsConnectionService.getStrainsByProject(projectId)
      this.validator.checkEntity(CropStrains)
       
        const  CropStrainDictionary = new Map<number, CropStrain>();
       
        for (const strain of CropStrains){
          CropStrainDictionary.set(strain.id, strain);
        }
        return CropStrainDictionary
      }
      
}