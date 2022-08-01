import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, JoinTable, BaseEntity } from 'typeorm';
import { Unit } from './unit.entity';

@Entity()
export class UnitsFamily extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(type => Unit, unit => unit.family)
    units: Unit[];
}
