import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Project} from 'src/modules/project/entities/project.entity';
import {GrowingSeason} from './growing_season.entity';
@Entity()
export class Plot {
  @PrimaryGeneratedColumn()
  id: number;

  
  @OneToOne(type => Project) 
  @JoinColumn()
  project: number;

  @Column()  // should be one many to one
  crop_strainId: number;

  @OneToOne(type => GrowingSeason) @JoinColumn()
  @Column()  // should be one many to one
  season: number;

  @Column()  // should be many to many to one
  main_gplotId: number;

  @Column({ type: 'date' })
  startDate: string;
  
  @Column({ type: 'date' })
  endDate: string;
}