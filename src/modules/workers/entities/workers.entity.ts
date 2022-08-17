import { Entity, Column, PrimaryGeneratedColumn,  ManyToMany, JoinTable } from 'typeorm';
import { WorkerType } from './workerTypes.entity';

@Entity('worker')
export class Worker {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    projectId: number;

   
    @ManyToMany(() => WorkerType, 
                (type)=>(type.workers),
                {
                    cascade: true,
                    
                })
    types: Promise<WorkerType[]>;
}