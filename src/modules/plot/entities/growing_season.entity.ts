import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import {Project} from 'src/modules/project/entities/project.entity';
type NewType = string;

@Entity()
export class GrowingSeason {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Project) @JoinColumn()
  project: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: NewType;
  
  @Column({ type: 'date' })
  endDate: string;
}