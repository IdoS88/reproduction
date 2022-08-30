import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn,BaseEntity } from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';
import {CropsStrain } from 'src/modules/crops/entities/cropsStrain.entity';

import {GrowingSeason} from './growing_season.entity';

@Entity('plots')
export class Plots extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  projectId: number;
  @OneToMany(type => Project, projectid=>Project.getId)
  @JoinColumn({name: "projectId" })
  project: Project;
  
  @Column()  crop_strainid: number;
  @OneToMany(type => CropsStrain, crop_strainid=>CropsStrain.getId, { nullable: true }) 
  @JoinColumn({name: "crop_strainid" })  // should be one many to one
  cropStrain: CropsStrain;

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