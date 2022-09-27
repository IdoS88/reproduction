import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCropTypeDto, UpdateCropTypeDto } from '../dto/CropType.dto';
import { CropType } from '../entities/cropType.entity';
import { GenericEntityService } from 'src/modules/infrastructures/services/service.generic';
import { CropValidator } from './crops.validator';
import { CropsConnectionService } from './crops.connection.service';


@Injectable()
export class CropTypeService extends  GenericEntityService <CropType, CropValidator> {
  constructor(
    @InjectRepository(CropType)
    protected repository: Repository<CropType>,
    //@Inject(forwardRef(()=>CropService)) private cropService: CropService
    @Inject(CropsConnectionService) private cropsConnectionService: CropsConnectionService
  ){
    super(repository);
    this.validator=new CropValidator(this)
  }

  async create(createCropTypeDto: CreateCropTypeDto): Promise<CropType|null> {
    let cropType = new CropType();
    cropType.name = createCropTypeDto.name;
    await this.repository.save(cropType);
    return cropType;
  }

  async update(
    id: number, 
    updateCropTypeDto: UpdateCropTypeDto) :Promise<CropType| null> {
      console.log('CropTypeRepository : update()  CropType ${id}  not implemented yet');
      return null;
  };

  async delete(
    id: number): Promise<boolean> {
      console.log('CropTypeRepository : delete()  CropType ${id} not implemented yet');
      return false;
  };

  getAll(): Promise<CropType[]> {
    return this.repository.find();
  }

  getCropTypeById(id: number): Promise<CropType> {
    if (id <= 0)
      throw Error("CropType id cannot be negative");
    return this.repository.findOne({
      where: {
        id: id,
      }
    });
  }

  async getAllTypesByStrainIds(cropTypeIds: number[]):Promise<CropType[]>{
    let cropsTypes = this.repository.find({
        where: {
            id: In (cropTypeIds)
          },
        })
    return cropsTypes
  }

  

  async getAllCropsTypeByProject(projectId: number): Promise<Map<number, CropType>> {
   
    let cropStrains = await this.cropsConnectionService.getStrainsByProject(projectId)
    const  CropTypeDictionary = new Map<number, CropType>();
    
    if (cropStrains.length>0){
      let  cropStrainsMap = new Map(
        cropStrains.map(e=>{return [e.id, e]}))
              
      let cropStrainsIds =Array.from(cropStrainsMap.keys())
    
      let cropTypeObjects=await this.getAllTypesByStrainIds(cropStrainsIds)
      if (cropTypeObjects.length > 0) {
        for (const cropType of cropTypeObjects){  
           CropTypeDictionary.set(cropType.id, cropType);
        }
      }
    }
    return CropTypeDictionary;
  }
}
