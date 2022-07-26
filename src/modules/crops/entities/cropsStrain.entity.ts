import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,BaseEntity } from 'typeorm';
import { Crops } from './crop.entity';

@Entity()
export class CropsStrain extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    cropId: number;
    @ManyToOne(() => Crops, crop => crop.strain)
    @JoinColumn({ name: "cropId" })
    crop: Crops;
}
