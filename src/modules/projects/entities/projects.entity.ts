import { CropsStrain } from 'src/modules/crops/entities/cropsStrain.entity';
import { Entity, Column, PrimaryGeneratedColumn, 
         BaseEntity, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('projects')
export class Project extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconSrc: string;

  @ManyToMany(() => CropsStrain, 
              (crpstrn: CropsStrain) => crpstrn.projectsArr) 
              // { cascade: true ,
              //   onUpdate:'CASCADE',
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
cropsStrainArr!: CropsStrain[];
}