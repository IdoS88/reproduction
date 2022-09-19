import { err_EntityNotFound } from "src/modules/commons/errors";
import { IGenericEntity, ISpecificEntity } from "../entities/interface.entity";
import {IGenericValidator, ISpecificValidator} from "./validator.interface"
import {Project} from 'src/modules/projects/entities/projects.entity'

export class GenericValidator implements IGenericValidator{
   private _serviceOwner: string="";

   set service(serviceOwnerName: string){
      this._serviceOwner=serviceOwnerName
   }

   public checkUser(){
      return false;
   }

   public checkEntity (entity: IGenericEntity|IGenericEntity[],
               entityType: string = ""){

         if (entity==null){
            throw new err_EntityNotFound(`${this._serviceOwner} validaotr: requested ${entityType} not found`);
        }

        return true;
      }
}

export class SpecificValidator extends GenericValidator implements ISpecificValidator{


   //validate that given project indeed allow link to relevant tables ids
   // chek if parameters interface can be anonimous , such each implementation i
   public checkProjectLink( 
      arg0: Project, 
      arg1: number) : boolean{
         return false;
      }
}