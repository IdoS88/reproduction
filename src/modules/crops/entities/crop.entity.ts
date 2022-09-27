import { GenericEntity } from 'src/modules/infrastructures/entities/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { CropType } from './CropType.entity';
import { CropStrain } from './CropStrain.entity';

@Entity('crop')
export class Crop extends GenericEntity{
   @PrimaryGeneratedColumn()
   id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    typeId: number;
    @ManyToOne(() => CropType, CropType => CropType.Crop)
    @JoinColumn({name: "typeId" })
    type: CropType;

    @OneToMany(type => CropStrain, CropStrain => CropStrain.crop)
    strains: CropStrain[];
}
