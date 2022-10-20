import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { SpecificEntity } from 'src/modules/infrastructures/entities/abstract.entity';
//import { PlotsConnection } from './plotsConnection.entity';
import { PlotStrain } from './plotStrain.entity';
import { Project } from 'src/modules/projects/entities/projects.entity';

@Entity('season')
export class Season extends SpecificEntity {
  @PrimaryGeneratedColumn()  id: number;
  
  @Column()   name: string;

  @OneToMany(() => PlotStrain, (plotStrain) => plotStrain.season)
  public plotStrains!: PlotStrain[];

  @Column() projectId;
  @ManyToOne(()=>Project)
  @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  public project!: Project;
}
