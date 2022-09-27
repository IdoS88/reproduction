import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn,BaseEntity, ManyToOne } from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';
import {CropStrain } from 'src/modules/crops/entities/cropStrain.entity';

import {GrowingSeason} from './growing_season.entity';
import { SpecificEntity } from 'src/modules/infrastructures/entities/abstract.entity';
//import { ISpecificEntity } from 'src/modules/infrastructures/entities/interface.entity';

@Entity('plots')
export class Plots extends SpecificEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  projectId: number;
  @ManyToOne(type => Project, 
             project=>project.plots,
             { cascade: true })
  @JoinColumn({name: "projectId" })
  project: Project;
  
  @Column()  crop_strainId: number;
  @ManyToOne(type => CropStrain, 
             crop_strain=>crop_strain.plots, 
             { nullable: true,
               cascade: true }) 
  @JoinColumn({name: "crop_strainId" })  // should be one many to one
  CropStrain: CropStrain;

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