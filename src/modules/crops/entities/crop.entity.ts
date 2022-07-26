import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { CropsKind } from './cropsKind.entity';
import { CropsStrain } from './cropsStrain.entity';

@Entity()
export class Crops extends BaseEntity{
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
    strain: CropsStrain[];
}
