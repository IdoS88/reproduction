import { err_EntityNotFound } from "src/modules/commons/errors";
import { Injectable } from '@nestjs/common';
import { GenericValidator } from "src/modules/infrastructures/services/validators.base";
import { Tool } from "src/modules/tools/entities/tools.entity";

@Injectable()
export class ProjectValidator extends GenericValidator{
    
    
    // checkCroptrain(
    //     CroptrianObject: CropStrain): boolean{
        
    //     if (CroptrianObject==null){
    //         throw new err_EntityNotFound(`Project validaotr:  requested Croptrain not found`);
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