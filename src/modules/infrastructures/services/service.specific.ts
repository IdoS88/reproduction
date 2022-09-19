import { BaseEntity, Repository} from 'typeorm';
import { err_illegalMissingProject } from 'src/modules/commons/errors';
//import { genericDTO } from '../dto/abstract.dto';
import { GenericEntityService, IGenericEntityService } from './service.generic';
import { ISpecificEntity } from '../entities/interface.entity';
import { ISpecificValidator } from './validator.interface';
//import { SpecificEntity } from '../entities/abstract.entity';

export interface ISpecificEntityService extends IGenericEntityService{
    create:(createDTO?:unknown)=> Promise<unknown|null>;
    update:(entityId: number,updateDTO?:unknown)=> Promise<unknown|null>;
    delete:(entityId: number)=> Promise<boolean>;
}

export class SpecificEntityService<E extends ISpecificEntity, V extends ISpecificValidator > extends GenericEntityService<E, V>
 implements ISpecificEntityService   {
    constructor(
        protected repository: Repository<E>,
        protected validator: V){
        super(repository, validator);
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