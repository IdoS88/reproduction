import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { CropType } from './cropType.entity';
import { CropStrain } from './cropStrain.entity';
<<<<<<< HEAD
import { GenericEntity } from 'src/modules/infrastructures/entities/abstract.entity';
=======
>>>>>>> a096d77d0510cc92b64665b7c3b7954e9edb0aa0

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
