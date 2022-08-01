import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { UnitsFamily } from './unitsFamily.entity';

@Entity()
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    familyid: number;
    @ManyToOne(() => UnitsFamily, unitsFamily => unitsFamily.units)
    @JoinColumn({name: "familyid" })
    family: UnitsFamily;
}
