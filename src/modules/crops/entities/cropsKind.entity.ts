import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Crop } from './crop.entity';

@Entity()
export class CropsKind {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Crop, crop => crop.kind)
    crops: Crop[];
}
