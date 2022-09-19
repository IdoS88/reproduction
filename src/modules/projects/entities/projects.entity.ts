import { CropsStrain } from 'src/modules/crops/entities/cropsStrain.entity';
import { Plots } from 'src/modules/plots/entities/plots.entity';
import { Entity, Column, PrimaryGeneratedColumn, 
         BaseEntity, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('projects')
export class Project extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconSrc: string;

  @OneToMany(() => Plots, (plot) => plot.project)
  plots!: Plots[]

  @ManyToMany(() => CropsStrain, 
              (crpstrn: CropsStrain) => crpstrn.projects)
              // { cascade: true })
              //   eager: true})
  // @JoinTable({
  //   name: "project_cropStrain", // table name for the junction table of this relation
  //   joinColumn: {
  //       name: "project",
  //       referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //       name: "cropsStrain",
  //       referencedColumnName: "id"
  //   }
//})
cropStrains!: CropsStrain[];
}