import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import { IGenericEntity } from '../entities/interface.entity';
import { IGenericValidator } from './validators.interface';
import { GenericValidator } from './validators.base';

//import { GenericEntity, SpecificEntity } from '../entities/abstract.entity';

export interface IGenericEntityService {
    create:(createDTO?:unknown)=> Promise<unknown|null>;
    update:(entityId: number,updateDTO?:unknown)=> Promise<unknown|null>;
    delete:(entityId: number)=> Promise<boolean>;
}

//@Injectable()
export class GenericEntityService<E extends IGenericEntity, V extends GenericValidator> implements IGenericEntityService {
    protected _validator: V
    constructor(protected repository: Repository<E>){
        this._validator = null 
    }
    
    protected set validator(v:V){
        this._validator = v
    }
    protected get validator(): V{
        return this._validator;
    }
    async create(createDTO?:unknown): Promise<E|null>{return null}
    async update(entityId: number,updateDTO?:any): Promise<E|null>{return null};
    async delete(entityId: number): Promise<boolean>{return null};
}