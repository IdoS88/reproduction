import { err_EntityNotFound } from "src/modules/commons/errors";
import { CropsStrain } from "src/modules/crops/entities/cropsStrain.entity";
import { IGenericEntity } from "src/modules/infrastructures/entities/interface.entity";
import { GenericValidator } from "src/modules/infrastructures/services/validators.base";
import { Tool } from "src/modules/tools/entities/tools.entity";
import { Project } from "../entities/projects.entity";

export class ProjectValidator extends GenericValidator{
    
    
    // checkCropStrain(
    //     cropStrianObject: CropsStrain): boolean{
        
    //     if (cropStrianObject==null){
    //         throw new err_EntityNotFound(`Project validaotr:  requested cropStrain not found`);
    //     }

    //     return true;
    // }


    checkWorker(
        workerObject: Worker): boolean{
        
        if (workerObject==null){
            throw new err_EntityNotFound(`Project validaotr:  requested worker not found`);
        }

        return true;
    }


    checkTool(
        toolObject: Tool): boolean{
        
        if (toolObject==null){
            throw new err_EntityNotFound(`Project validaotr:  requested tool not found`);
        }

        return true;
    }

}