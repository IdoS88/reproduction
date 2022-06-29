import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import {Projects} from 'src/modules/projects/entities/projects.entity';
type NewType = string;

@Entity()
export class GrowingSeason {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Projects) @JoinColumn()
  project: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: NewType;
  
  @Column({ type: 'date' })
  endDate: string;
}