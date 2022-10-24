import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Crop } from './crop.entity';
import { CropStrain } from './cropStrain.entity';
<<<<<<< HEAD
import { GenericEntity } from 'src/modules/infrastructures/entities/abstract.entity';
=======
>>>>>>> a096d77d0510cc92b64665b7c3b7954e9edb0aa0

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
