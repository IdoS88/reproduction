import { Entity, Column, PrimaryGeneratedColumn,  ManyToMany, JoinTable } from 'typeorm';
 import { Worker } from './workers.entity';

@Entity('workerType')
export class WorkerType {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(() => Worker,
                 (worker) => worker.types,
                 {eager:true})
    @JoinTable({
        name: 'workers_connect_types',
        inverseJoinColumn : { name: 'workerId', referencedColumnName: 'id'},
        joinColumn: { name: 'typeId', referencedColumnName: 'id'},
    })
    workers: Promise<Worker[]>;
}
