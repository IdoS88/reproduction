import { err_EntityNotFound } from "src/modules/commons/errors";
import { CropsStrain } from "src/modules/crops/entities/cropsStrain.entity";
import { ISpecificEntity } from "src/modules/infrastructures/entities/interface.entity";
import { GenericValidator } from "src/modules/infrastructures/services/validators.base";
import { Crops } from "../entities/crop.entity";
import { CropsKind } from "../entities/cropsKind.entity";
//import { Project } from "../entities/projects.entity";

export class CropsValidator extends GenericValidator{
    
    checkCropStrain(
        entity: CropsStrain|Crops|CropsKind): boolean{
        
        if (entity==null){
            throw new err_EntityNotFound(`Crops validaotr:  requested cropStrain not found`);
        }

        return true;
    }

    checkCropKind(
        cropKindObject: CropsKind): boolean{
        
        if (cropKindObject==null){
            throw new err_EntityNotFound(`Crops validaotr:  requested cropKind not found`);
        }

        return true;
    }

   

}