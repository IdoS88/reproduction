import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm';
 import { Worker } from './workers.entity';
 import { Tool } from './tools.entity';

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(() => Tool, (tool) => tool.types)
    tools: Tool[]

    @ManyToMany(() => Worker, (worker) => worker.types)
    workers: Worker[]
}
