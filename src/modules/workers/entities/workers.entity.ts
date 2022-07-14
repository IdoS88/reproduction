import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Type } from './types.entity';

@Entity()
export class Worker {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    projectId: number;

    @Column()
    typesId: string;
    @ManyToMany(() => Type, (type) => type.workers)
    @JoinTable()
    @JoinColumn({name: "typesId" })
    types: Type[]
}
