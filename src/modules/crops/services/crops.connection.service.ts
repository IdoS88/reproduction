import { Injectable } from '@nestjs/common';
import {DataSource, In} from 'typeorm'
import {CropStrain} from '../entities/cropStrain.entity'
import {Crop} from '../entities/crop.entity'
import {CropType} from '../entities/cropType.entity'


@Injectable()
export class CropsConnectionService {
    constructor(private dataSource : DataSource){ }

     
    async getStrainsByProject(projectId: number): Promise<CropStrain[]>{
        //console.log ("sivan: getStrainsIdsByProject not implemented yet");
        let cropStrains = await this.dataSource.manager
            .createQueryBuilder(CropStrain, "cropStrain")
            .leftJoin("cropStrain.projects", "project")
            .where("project.id = :id", { id: projectId })
            .getMany()

        return cropStrains
    }

    async getAllStrainsByStrainIds(Ids: number[]):Promise<CropStrain[]>{
        //console.log ("sivan: getAllStrainsByStrainIds not implemented yet");
        let cropStrains = await this.dataSource
            .createQueryBuilder()
            .from(CropStrain, "cropStrain")
            .leftJoin("cropStrain.crop","crop")
          //  .leftJoinAndSelect("cropStrain.crop","cropSelect")
            .where("cropStrain.id In (:ids)", { ids: Ids })
            .getMany()
        return cropStrains
    }

    async getAllCropsByStrainIds(Ids: number[]):Promise<Crop[]>{
        let crops = this.dataSource.getRepository(Crop).find({
            where: {
                id: In (Ids)
              },
            })
        return crops
    }
    // async getAllTypesByStrainIds(Ids: number[]):Promise<CropType[]>{
    //     let cropsTypes = this.dataSource.getRepository(CropType).find({
    //         where: {
    //             id: In (Ids)
    //           },
    //         })
    //     return cropsTypes
    // }

   //Get single entity by id
    async getCropById(cropId: number):Promise<Crop>{
        console.log (`sivan: cropConnectionService getCropById ${cropId}`);
        // let crop = await this.dataSource
        //     .createQueryBuilder()
        //     .from(Crop, "crop")
        //     .where(`crop.id = ${cropId}`)
        //     .getOne()
        let crop = await this.dataSource
            .getRepository(Crop)
            .findOne({
                where: {
                    id : cropId
                }
            })
        return crop
    }

    async getCropTypeById(cropTypeId: number):Promise<CropType>{
        console.log ("sivan: getCropTypeById not implemented yet");
        let cropType = await this.dataSource
            .getRepository(CropType)
            .findOne({
                where: {
                    id : cropTypeId
                }
            })
        return cropType;
    }
}