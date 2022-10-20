import { CropStrain } from 'src/modules/crops/entities/cropStrain.entity';
import { Plots } from 'src/modules/plots/entities/plots.entity';
//import { PlotsConnection } from 'src/modules/plots/entities/plotsConnection.entity';
import { Entity, Column, PrimaryGeneratedColumn, 
         BaseEntity, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { PlotStrain } from 'src/modules/plots/entities/plotStrain.entity';

@Entity('projects')
export class Project extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconSrc: string;

  // @OneToMany(() => Plots, (plot) => plot.project)
  // plots!: Plots[]

  // @OneToMany(() => PlotsConnection, pss => pss.project)
  // public pss!: PlotsConnection[];

  @ManyToMany(() => CropStrain, 
              (crpstrn: CropStrain) => crpstrn.projects)
  cropStrains!: CropStrain[];

  @OneToMany(() => Plots, Plots=>Plots.project)
  plots!: Plots[];
}