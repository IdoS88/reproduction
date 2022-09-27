import { GenericEntity } from 'src/modules/infrastructures/entities/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Crop } from './crop.entity';
import { CropStrain } from './CropStrain.entity';

@Entity('cropType')
export class CropType extends GenericEntity{
    @PrimaryGeneratedColumn()
    id: number;

    //sivan: add constrains: nullable
    @Column()
    name: string;

    //sivan: add constrains: nullable, >0
    @OneToMany(type => Crop, crop => crop.type,
        { cascade: true ,
            onUpdate:'CASCADE',
            onDelete:'CASCADE'
        })
    Crop: Crop[];

    //sivan: add constrains: nullable, >0
    @OneToMany(type => CropStrain, Croptrain => Croptrain.cropType)
    strains: CropStrain[];
}
