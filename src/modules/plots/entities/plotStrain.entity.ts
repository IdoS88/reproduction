import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn , BaseEntity, ManyToOne, ManyToMany, IsNull} from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';
import { SpecificEntity } from 'src/modules/infrastructures/entities/abstract.entity';
import { CropStrain } from 'src/modules/crops/entities/cropStrain.entity';
//import { PlotsConnection } from './plotsConnection.entity';
import { Season } from './season.entity';
import { Plots } from './plots.entity';


@Entity('plotStrain')
export class PlotStrain extends SpecificEntity {
  @PrimaryGeneratedColumn() id: number; 

  @Column({ length: 50 })  name: string;
  
  @Column()  number: number;

  @Column({nullable: true}) area: number;

  @Column({nullable: true}) remarks: string;

  // @OneToOne(type => Projects) @JoinColumn()
  // @Column()
  // projectId: number;
  // @OneToMany(type => Project, projectid=>Project.getId)
  // @JoinColumn({name: "projectId" })
  // project: Project;

  @Column()
  cropStrainId: number;
  @OneToMany(() => CropStrain, ()=>CropStrain.getId)
  @JoinColumn({name: "cropStrainId" })
  cropStrain:CropStrain

 
  @Column()  seasonId: number;
  @ManyToOne(() => Season, (season)=>season.plotStrains)
  @JoinColumn()
  season: Season;

  @Column({
    nullable: true,
    /* transformer :  {
      from: (aDate: Date) => aDate.getTime(),
      to: (epochValue: number) => new Date(epochValue)
    }*/ })  
  startDate: number;   //epoch dateTime 
  
  @Column({nullable: true,
    /* transformer :  {
      from: (aDate: Date) => aDate.getTime(),
      to: (epochValue: number) => new Date(epochValue)
    }*/ })  
  endDate: number;     //epoch dateTime 

  // @OneToMany(() => PlotsConnection, plots_connect => plots_connect.plotStrains)
  // public plotConnectors!: PlotsConnection[];

  @ManyToMany(() => Plots,  (plot) => plot.plotStrains)
  plots!:Plots[];


  @Column({nullable: true}) mainPlotId: number;

  @Column()  projectId: number;
  @ManyToOne(type => Project)
  @JoinColumn()
  project: Project;
}
