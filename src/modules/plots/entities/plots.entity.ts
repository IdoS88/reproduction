import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Projects} from 'src/modules/projects/entities/projects.entity';
import {GrowingSeason} from './growing_season.entity';
@Entity()
export class Plots {
  @PrimaryGeneratedColumn()
  id: number;

  
  @OneToOne(type => Projects) 
  @JoinColumn()
  project: number;

  @Column()  // should be one many to one
  crop_strain: number;

  @OneToOne(type => GrowingSeason) @JoinColumn()
  @Column()  // should be one many to one
  season: number;

  @Column()  // should be many to many to one
  main_gplot: number;

  @Column({ type: 'date' })
  startDate: string;
  
  @Column({ type: 'date' })
  endDate: string;
}