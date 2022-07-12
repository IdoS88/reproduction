import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,BaseEntity } from 'typeorm';
import {Projects} from 'src/modules/projects/entities/projects.entity';
import {GrowingSeason} from './growing_season.entity';
@Entity()
export class Plots extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Projects) 
  @JoinColumn()
  project: number;
  
  @Column({nullable: true})  // should be one many to one
  crop_strainid: number;

  @OneToOne(type => GrowingSeason) 
  @JoinColumn()  // should be one many to one
  season: number;

  @Column()  // should be many to many to one
  main_gplot: number;

  @Column({ type: 'date' })
  start_date: Date;
  
  @Column({ type: 'date' })
  end_date: Date;
}