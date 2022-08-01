import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Type } from './types.entity';

@Entity()
export class Worker {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    projectid: number;

    @Column("simple-array")
    typesid: number[];
    @ManyToMany(() => Type, (type) => type.workers)
    @JoinTable()
    @JoinColumn({name: "typesid" })
    types: Type[]

    @OneToMany(type => WorkerToTypes, workertotypes => workertotypes.worker)
    type: WorkerToTypes[];
}


@Entity()
export class WorkerToTypes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    workerid: number;
    @ManyToOne(() => Worker, worker => worker.type)
    @JoinColumn({name: "workerid" })
    worker: Worker;

    @Column()
    typeid: number;
    @ManyToOne(() => Type, type => type.workertotype)
    @JoinColumn({name: "typeid" })
    wtype: Type;
}