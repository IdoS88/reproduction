import {  BaseEntity} from 'typeorm';

export interface IGenericEntity extends BaseEntity{
    id: number;
}

export interface ISpecificEntity extends IGenericEntity{
   // projectId: number;
}