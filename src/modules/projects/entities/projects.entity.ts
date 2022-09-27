import { CropStrain } from 'src/modules/crops/entities/cropStrain.entity';
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

  @ManyToMany(() => CropStrain, 
              (crpstrn: CropStrain) => crpstrn.projects)
              // { cascade: true })
              //   eager: true})
  // @JoinTable({
  //   name: "project_Croptrain", // table name for the junction table of this relation
  //   joinColumn: {
  //       name: "project",
  //       referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //       name: "CropStrain",
  //       referencedColumnName: "id"
  //   }
//})
cropStrains!: CropStrain[];
}