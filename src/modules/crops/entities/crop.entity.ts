import { GenericEntity } from 'src/modules/infrastructures/entities/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { CropsKind } from './cropsKind.entity';
import { CropsStrain } from './cropsStrain.entity';

@Entity('crops')
export class Crops extends GenericEntity{
   @PrimaryGeneratedColumn()
   id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    kindId: number;
    @ManyToOne(() => CropsKind, cropKind => cropKind.crops)
    @JoinColumn({name: "kindId" })
    kind: CropsKind;

    @OneToMany(type => CropsStrain, cropsStrain => cropsStrain.crop)
    strains: CropsStrain[];
}
