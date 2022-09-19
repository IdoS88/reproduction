import { err_EntityNotFound } from "src/modules/commons/errors";
import { ISpecificEntity } from "src/modules/infrastructures/entities/interface.entity";
import { SpecificValidator } from "src/modules/infrastructures/services/validators.base";
import { Project } from "src/modules/projects/entities/projects.entity";
import { Plots } from "../entities/plots.entity";

export class PlotValidator extends SpecificValidator{
    // checkEntity(plotObj: Plots): boolean{
    //     if (plotObj===null){
    //         //sivan: should through exception
    //         throw new err_EntityNotFound(`PlotService service :  requested plot not found`);
    //       }
    //       return true
    //     }    checkUser(): boolean{
    //     return true;
    // }


    checkProjectLink(
        projectObject: Project,
        projectLinkId?: number): boolean{
        
        let result = true; // its is ok  if crop_strainId is missing
        let crop_strainId = projectLinkId

        if (crop_strainId!==undefined){
            
            let cropStrain_in_project= projectObject.cropStrains.find(
                function(x){  return (x.id === crop_strainId)});  

            if (cropStrain_in_project===undefined)  {
                throw new err_EntityNotFound (`PlotService validator :  project ${projectObject.id} not allows cropstrain ${crop_strainId}`);
            }
           result=true; 
        }
        return result;
    }

    
}