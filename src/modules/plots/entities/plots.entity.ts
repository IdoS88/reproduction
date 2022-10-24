import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn,BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';
import {CropStrain } from 'src/modules/crops/entities/cropStrain.entity';

import {Season} from './season.entity';
import { SpecificEntity } from 'src/modules/infrastructures/entities/abstract.entity';
import { PlotStrain } from './plotStrain.entity';
//import { PlotsConnection } from './plotsConnection.entity';
//import { ISpecificEntity } from 'src/modules/infrastructures/entities/interface.entity';

@Entity('plots')
export class Plots extends SpecificEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column() number: number;

  @Column() name: string;

  @Column({nullable: true}) area: number;

  @Column({nullable: true}) remarks: string;

 // @OneToMany(() => PlotsConnection, plots_strain_season => plots_strain_season.plots, { cascade: true })
 // public plotConnectors!: PlotsConnection[];      
  
  @ManyToMany(()=>PlotStrain, (plotStrain: PlotStrain)=>plotStrain.plots,
              { 
                cascade: true ,
                onUpdate:'CASCADE'
              })
  @JoinTable({
        name: "plots_connect", // table name for the junction table of this relation
        inverseJoinColumn: {
                name: "plotStrainId",
                referencedColumnName: "id"
        },
        joinColumn: {
            name: "plotId",
            referencedColumnName: "id"
        }
  })
  plotStrains!: PlotStrain[];

  @Column()  projectId: number;
  @ManyToOne(() => Project, 
              Project=>Project.plots,
             { cascade: true })
  @JoinColumn({name: "projectId" })
  project: Project;
  

  
}