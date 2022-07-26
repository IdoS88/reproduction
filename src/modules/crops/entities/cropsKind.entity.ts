import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Crops } from './crop.entity';

@Entity()
export class CropsKind {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Crops, crop => crop.kind)
    crops: Crops[];
}
