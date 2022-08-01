import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
 import { Worker } from './workers.entity';
 import { WorkerToTypes } from './workers.entity';
 import { Tool } from './tools.entity';
 import { ToolToTypes } from './tools.entity';

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(() => Tool, (tool) => tool.types)
    tools: Tool[]

    @OneToMany(type => ToolToTypes, tooltotypes => tooltotypes.ttype)
    tooltotype: WorkerToTypes[];

    @ManyToMany(() => Worker, (worker) => worker.types)
    workers: Worker[]

    @OneToMany(type => WorkerToTypes, workertotypes => workertotypes.wtype)
    workertotype: WorkerToTypes[];
}
