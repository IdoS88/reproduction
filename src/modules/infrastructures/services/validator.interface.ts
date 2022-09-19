import { Project } from "src/modules/projects/entities/projects.entity";
import { IGenericEntity, ISpecificEntity } from "../entities/interface.entity";

export interface IGenericValidator{
   checkUser:()=> boolean

   checkEntity: (arg0: IGenericEntity)=> boolean;
}
export interface ISpecificValidator  extends IGenericValidator  {
   //validate that given entity indeed assign to given project
   checkEntity: (arg0: ISpecificEntity)=> boolean;

   //validate that given project indeed allow link to relevant tables ids
   // chek if parameters interface can be anonimous , such each implementation i
   checkProjectLink: 
      ( arg0: Project, 
        arg1: number) => boolean;
}