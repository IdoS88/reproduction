import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn,BaseEntity } from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';
import {CropsStrain } from 'src/modules/crops/entities/cropsStrain.entity';

import {GrowingSeason} from './growing_season.entity';

@Entity('plots')
export class Plots extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  projectId: number;
  @OneToMany(type => Project, 
             projectId=>Project.getId,
             { cascade: true })
  @JoinColumn({name: "projectId" })
  project: Project;
  
  @Column()  crop_strainId: number;
  @OneToMany(type => CropsStrain, 
             crop_strainId=>CropsStrain.getId, 
             { nullable: true }) 
  @JoinColumn({name: "crop_strainId" })  // should be one many to one
  cropStrain: CropsStrain;

  @Column()  seasonId: number;
  @OneToOne(type => GrowingSeason,
            seasonId => GrowingSeason.getId) 
  @JoinColumn({name: "seasonId"})  // should be one many to one
  season: GrowingSeason;

  @Column()  // should be many to many to one
  main_gplot: number;

  @Column({ type: 'date' })
  start_date: Date;
  
  @Column({ type: 'date' })
  end_date: Date;
}