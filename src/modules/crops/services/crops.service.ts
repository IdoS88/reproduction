import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCropDto, UpdateCropDto } from '../dto/crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Crops } from '../entities/crop.entity';
import { CropsStrain } from '../entities/cropsStrain.entity';
import { GenericEntityService } from 'src/modules/infrastructures/services/service.generic';
import { CropsValidator } from './crops.validator';
import { CropsStrainService } from './cropsStrain.service';

//import { CropsKindService } from './cropsKind.service';

type relationsType = "none"| "kind"| "strains"| "all";

@Injectable()
export class CropsService extends  GenericEntityService <Crops, CropsValidator> {
  constructor(
    @InjectRepository(Crops)
    protected repository: Repository<Crops>,
    protected cropsValidator:CropsValidator,
    @Inject(forwardRef(()=>CropsStrainService)) private cropStrainService: CropsStrainService
  ){super(repository, cropsValidator)}

  private getRelationsRequest(relationsStr: relationsType): string[]{
    let relatios=[];
    switch (relationsStr){
      case "none": { break;}
      case "all":  { relatios=["kind","strains"];   break;}
      default : { relatios=[relationsStr];   break;}
    }
    return relatios
  }

  async create(createCropDto: CreateCropDto): Promise<Crops|null> {
    let crop = new Crops();
    crop.name = createCropDto.name;
    crop.color = createCropDto.color;
    crop.kindId = createCropDto.kindId;
    await this.repository.save(crop);
    return crop
  }
  async update(
    id: number, 
    updateCropDTO: UpdateCropDto) {
      let result = null;
    
      console.log(`cropsService : update()  crop ${id} `);
      let cropEntity = await this.getCropById(id,"all")
      this.cropsValidator.checkEntity(cropEntity)
      
      let cropStrianObjects : CropsStrain[]=null;
      if (updateCropDTO.cropsStrainIds !== null){
        cropStrianObjects=await this.cropStrainService.getCropsStrainByStrainIds(updateCropDTO.cropsStrainIds)
      }

     // if (this.validator.checkProjectLink(projectObject, updateDTO.crop_strainId)){
        //save plot with relevant crops strains
        cropEntity.kindId=updateCropDTO.kindId;
        cropEntity.name=updateCropDTO.name;
        cropEntity.color=updateCropDTO.color;
        cropEntity.strains=cropStrianObjects
  
        //projectEntity = await this.projectRepository.preload(projectEntity)
        result  = await this.repository.save(cropEntity);
      //}
      return result;

  };

  async delete(
    id: number): Promise<any> {
      console.log('cropsKindRepository : delete()  cropKind ${id} not implemented yet');
      return null;
  };

  async getAll(relationsStr: relationsType = "none"): Promise<Crops[]|null> {
    let result =null
    let relatios=this.getRelationsRequest(relationsStr);
    
    result = await this.repository.find({
        relations: relatios
    });
    return result;
  }

  async getCropById(
    id: number,
    relationsStr: relationsType= "none"): Promise<Crops> {
      let result =null
      let relatios=this.getRelationsRequest(relationsStr);
      //if (id <= 0)
      //  throw Error("Crop id cannot be negative");
      return this.repository.findOne({
        where: {
          id: id,
        },
        relations: relatios
      });
  }

  async getAllCropsByKind(
    cropkindid: number): Promise<Crops[]> {
    if (cropkindid <= 0)
      throw Error("CropsKind id cannot be negative");
    
    return await this.repository.find({
      where: {kindId: cropkindid},
      relations: ['kind']
    });
   
  }

  async getAllCropsByStrainIds(cropStrainIds: number[]): Promise<Crops[]> {
     let cropsStrain= await this.cropStrainService.getCropsStrainByStrainIds(cropStrainIds)
 
     let  crops : Crops[]=[];
     for (const strain of cropsStrain){
       crops.push(strain.crop)
     }
     return(crops)
   }
 
  
}
