import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import { IGenericEntity } from '../entities/interface.entity';
import { IGenericValidator } from './validator.interface';
//import { GenericEntity, SpecificEntity } from '../entities/abstract.entity';

export interface IGenericEntityService {
    create:(createDTO?:unknown)=> Promise<unknown|null>;
    update:(entityId: number,updateDTO?:unknown)=> Promise<unknown|null>;
    delete:(entityId: number)=> Promise<boolean>;
}

@Injectable()
export class GenericEntityService<E extends IGenericEntity, V extends IGenericValidator> implements IGenericEntityService {
    
    constructor(protected repository: Repository<E>,
                protected validator: V){}
    async create(createDTO?:unknown): Promise<E|null>{return null}
    async update(entityId: number,updateDTO?:any): Promise<E|null>{return null};
    async delete(entityId: number): Promise<boolean>{return null};
}