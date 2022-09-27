import { BaseEntity, Repository} from 'typeorm';
import { err_illegalMissingProject } from 'src/modules/commons/errors';
//import { genericDTO } from '../dto/abstract.dto';
import { GenericEntityService, IGenericEntityService } from './service.generic';
import { ISpecificEntity } from '../entities/interface.entity';
//import { ISpecificValidator } from './validators.interface';
import { SpecificValidator } from './validators.base';

//import { SpecificEntity } from '../entities/abstract.entity';

export interface ISpecificEntityService extends IGenericEntityService{
    create:(createDTO?:unknown, projectId?: number)=> Promise<unknown|null>;
    update:(entityId: number,updateDTO?:unknown, projectId?: number)=> Promise<unknown|null>;
    delete:(entityId: number, projectId?: number)=> Promise<boolean>;
}

export class SpecificEntityService<E extends ISpecificEntity, V extends SpecificValidator > extends GenericEntityService<E, V>
 implements ISpecificEntityService   {
    constructor(
        protected repository: Repository<E>){
        super(repository);
    };
       
   

    async getByIdAndProject(id: number, 
                            projectId?: number): Promise<E | null>{
            return null
    }
                            
    async  getByProject(projectId: number): Promise<E[] | null>{
        if (projectId===undefined){
            throw err_illegalMissingProject;
        }
        return null  
    };

    async  create(createDTO:unknown,
                 projectId?: number): Promise<E|null>{
        if (projectId===undefined){
            throw err_illegalMissingProject;
        }
        return null;
    };

    public  update(
        entityId: number, 
        updateDTO:unknown,
        projectId?: number): Promise<E|null>{
            if (projectId===undefined){
                throw err_illegalMissingProject;
            }
            return null

        };
        
    public  delete(
        entityId: number, 
        projectId?: number): Promise<boolean>{
            if (projectId===undefined){
                throw err_illegalMissingProject;
            }
        return 
    };
}